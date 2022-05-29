import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

enum BooleanLabelTypeEnum {
    YesNo = 'yesNo'
}

const path = 'interface.basic';
const yesNo = new Map([
    [true, `${path}.yes`],
    [false, `${path}.no`]
]);

const presetMap = {
    [BooleanLabelTypeEnum.YesNo]: yesNo
};

const green = 'color__green';
const red = 'color__red';

@Component({
    selector: 'app-boolean-label',
    template: `<span [ngClass]="color">{{ text$ | async }}</span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class BooleanLabelComponent implements OnInit, OnChanges {
    @Input() value: boolean | BooleanEnum = false;

    @Input() truthy: string;

    @Input() falsy: string;

    @Input() preset: keyof Record<BooleanLabelTypeEnum, string> = BooleanLabelTypeEnum.YesNo;

    color: string = red;

    private _text$: BehaviorSubject<string> = new BehaviorSubject<string>(yesNo.get(false));

    private _customText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    readonly text$ = combineLatest([this._text$.asObservable(), this._customText$.asObservable()]).pipe(
        switchMap(([text, customText]) => (customText ? of(customText) : this.translate.stream(text)))
    );

    constructor(private readonly translate: TranslateService, private unsubscribe: UnsubscribeService) {}

    ngOnInit(): void {
        this.init(this.value);

        this.translate.onLangChange
            .pipe(
                filter((): any => !!this.falsy || !!this.truthy),
                debounceTime(0),
                tap(() => {
                    this.setCustomText(Boolean(this.value));
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { value } = changes;
        const currentValue = value?.currentValue;

        if (currentValue || currentValue === BooleanEnum.False || currentValue === false) {
            this.init(currentValue);
        }
    }

    private init(value: boolean | BooleanEnum): void {
        const booleanValue = Boolean(value);
        this.setPresetText(booleanValue);
        this.setCustomText(booleanValue);
        this.setColor(booleanValue);
    }

    private setColor(value: boolean): void {
        this.color = value ? green : red;
    }

    private setPresetText(value: boolean): void {
        const preset = presetMap[this.preset];
        this._text$.next(preset.get(value));
    }

    private setCustomText(value: boolean): void {
        const customText = new Map([
            [true, this.truthy],
            [false, this.falsy]
        ]);
        this._customText$.next(customText.get(value));
    }
}
