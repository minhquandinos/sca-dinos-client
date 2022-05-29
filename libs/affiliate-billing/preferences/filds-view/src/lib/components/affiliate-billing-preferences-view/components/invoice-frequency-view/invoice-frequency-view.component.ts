import { I18nPluralPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, share, startWith, switchMap } from 'rxjs/operators';

import { LanguageEnum } from '@scaleo/platform/language/init';
import { PaymentFrequencyIdEnum } from '@scaleo/platform/list/access-data';

enum FrequencyTranslateNameEnum {
    Weekly = 'weekly',
    BiMonthly = 'bimonthly',
    Monthly = 'monthly',
    MonthlyQuarterly = 'monthly_quarterly'
}

@Component({
    selector: 'app-invoice-frequency-view',
    template: `{{ frequency$ | async }} `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [I18nPluralPipe]
})
export class InvoiceFrequencyViewComponent implements OnInit, OnChanges {
    @Input() type: PaymentFrequencyIdEnum;

    @Input() firstDay: number;

    @Input() lastDay: number;

    @Input() dayOfTheWeek: string;

    frequency$: Observable<string>;

    private readonly schemaTpl = 'billing2.affiliate.preferences.invoice_frequency';

    private readonly schema = 'invoice.settings.frequency';

    private subject: Subject<void> = new Subject();

    constructor(private translate: TranslateService, private pluralPipe: I18nPluralPipe) {}

    ngOnInit(): void {
        this.frequency$ = combineLatest([
            this.translate.onLangChange.pipe(startWith(this.translate.currentLang)),
            this.subject.pipe(startWith(''))
        ]).pipe(
            filter((): any => !!this.type),
            switchMap(() => this.frequencyFactory$),
            share()
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { type, firstDay, lastDay, dayOfTheWeek } = changes;

        if (type?.currentValue || firstDay?.currentValue || lastDay?.currentValue || dayOfTheWeek?.currentValue) {
            this.subject.next();
        }
    }

    private get frequencyFactory$(): Observable<string> {
        const frequency = {
            [PaymentFrequencyIdEnum.Weekly]: this.weekly$,
            [PaymentFrequencyIdEnum.BiMonthly]: this.bimonthly$,
            [PaymentFrequencyIdEnum.Monthly]: this.monthly$,
            [PaymentFrequencyIdEnum.MonthlyQuarterly]: this.monthlyQuarterly$
        };
        return frequency[this.type];
    }

    get weekly$(): Observable<string> {
        const interpolate = {
            week: this.translate.instant(`interface.date.week.list.${this.dayOfTheWeek?.toLowerCase()}`)
        };
        if (this.translate.currentLang === LanguageEnum.Russian) {
            interpolate.week = interpolate.week.toLowerCase();
        }
        return this.translateFrequency(FrequencyTranslateNameEnum.Weekly, interpolate);
    }

    get bimonthly$(): Observable<string> {
        const interpolate = {
            firstDay: this.firstDay,
            lastDay: this.lastDay,
            endingFirst: this.plural(this.firstDay),
            endingSecond: this.plural(this.lastDay)
        };
        return this.translateFrequency(FrequencyTranslateNameEnum.BiMonthly, interpolate);
    }

    get monthly$(): Observable<string> {
        const interpolate = {
            firstDay: this.firstDay,
            endingFirst: this.plural(this.firstDay)
        };
        return this.translateFrequency(FrequencyTranslateNameEnum.Monthly, interpolate);
    }

    get monthlyQuarterly$(): Observable<string> {
        const interpolate = {
            firstDay: this.firstDay,
            endingFirst: this.plural(this.firstDay)
        };
        return this.translateFrequency(FrequencyTranslateNameEnum.MonthlyQuarterly, interpolate);
    }

    private translateFrequency(type: FrequencyTranslateNameEnum, interpolateParams: { [key: string]: unknown } = {}): Observable<string> {
        return this.translate.stream(`${this.schemaTpl}.${type}`, {
            type: this.translate.instant(`${this.schema}.${type}`),
            ...interpolateParams
        });
    }

    private plural(value: number): string {
        return this.translate.instant(
            this.pluralPipe.transform(value, {
                '=1': 'interface.date.month.plural.first',
                '=2': 'interface.date.month.plural.second',
                '=3': 'interface.date.month.plural.third',
                other: 'interface.date.month.plural.other'
            })
        );
    }
}
