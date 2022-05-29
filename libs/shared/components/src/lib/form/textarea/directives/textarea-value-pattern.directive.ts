import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { PATTERN_MAP, RegexpNameType } from '@scaleo/shared/regexp';

import { TextareaComponent } from '../textarea.component';

enum ApplyPatternEnum {
    OnChange = 'onChange',
    AfterFocusOut = 'afterFocusOut',
    KeyUp = 'keyup'
}

@Directive({
    selector: '[appTextareaValuePattern]',
    providers: [UnsubscribeService]
})
export class TextareaValuePatternDirective implements OnInit {
    private _subject$: Subject<Observable<any>> = new Subject<Observable<any>>();

    @Input('appTextareaValuePattern') pattern!: RegexpNameType | RegExp;

    @Input() applyEventPattern: keyof Record<ApplyPatternEnum, string> = ApplyPatternEnum.OnChange;

    @Input() keyUpDelay = 500;

    @HostListener('input')
    onInput() {
        if (this.applyEventPattern === ApplyPatternEnum.OnChange) {
            this._subject$.next(EMPTY);
        }
    }

    @HostListener('focusout')
    focusOut() {
        if (this.applyEventPattern === ApplyPatternEnum.AfterFocusOut) {
            this._subject$.next(EMPTY);
        }
    }

    @HostListener('keyup')
    onKeyDown() {
        if (this.applyEventPattern === ApplyPatternEnum.KeyUp) {
            const observable = new Observable<any>((observer) => {
                observer.next();

                return {
                    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
                    unsubscribe() {
                        observer.unsubscribe();
                    }
                };
            });
            this._subject$.next(observable.pipe(debounceTime(this.keyUpDelay)));
        }
    }

    constructor(
        private readonly host: TextareaComponent,
        private readonly renderer: Renderer2,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._subject$
            .pipe(
                switchMap((observable) => observable ?? of('')),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.newValue();
            });
    }

    private get getPattern(): RegExp {
        if (typeof this.pattern === 'string') {
            return PATTERN_MAP[this.pattern as RegexpNameType];
        }

        return this.pattern ?? undefined;
    }

    private newValue(): void {
        let newValue = this.host.elementRef.nativeElement.value;
        newValue = newValue.replace(this.getPattern, '');
        this.renderer.setProperty(this.host.elementRef.nativeElement, 'value', newValue);
        this.host.onChange(newValue);
    }
}
