import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

type DisplayStyleType = 'block' | 'flex' | 'none';

@Directive({
    selector: '[uiDropdownEntityItemRef]',
    providers: [UnsubscribeService],
    exportAs: 'uiDropdownEntityItemRef'
})
export class DropdownEntityItemRefDirective implements AfterViewInit {
    private _displayStyle$ = new BehaviorSubject<DisplayStyleType>('none');

    private displayStyle$ = this._displayStyle$.pipe(debounceTime(100), distinctUntilChanged());

    @Input() displayStyle: DisplayStyleType = 'block';

    @HostListener('mouseover', ['$event'])
    iconHover() {
        this.setDisplay();
    }

    @HostListener('mouseout', ['$event'])
    iconOut() {
        this.setNoneDisplay();
    }

    constructor(
        private readonly host: ElementRef,
        private readonly renderer: Renderer2,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngAfterViewInit(): void {
        this.displayStyle$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => this.renderer.setStyle(this.host.nativeElement, 'display', value));
    }

    setDisplay() {
        this._displayStyle$.next(this.displayStyle);
    }

    setNoneDisplay() {
        this._displayStyle$.next('none');
    }
}
