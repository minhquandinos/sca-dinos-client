import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { CustomDateRangeUtil, DateUtil } from '@scaleo/platform/date/util';
import { DateFormatService } from '@scaleo/platform/format/service';

import { CustomDateRangePickerService } from './custom-date-range-picker.service';
import { CustomDateRangePresetService } from './custom-date-range-preset.service';

export interface CustomDateRangeInitOptionsModel {
    startDate: string;
    endDate: string;
    single: boolean;
    position: 'left' | 'right' | 'center';
    drops: 'up' | 'down';
    autoUpdateInput: boolean;
    availableFeaturesDate: boolean;
}

@Injectable()
export class CustomDateRangeInitService {
    private _options$: BehaviorSubject<BaseObjectModel> = new BehaviorSubject<BaseObjectModel>({});

    readonly options$ = this._options$.asObservable();

    private _configOptions: CustomDateRangeInitOptionsModel;

    constructor(
        private readonly _customDateRangeService: CustomDateRangeService,
        private readonly _translate: TranslateService,
        private readonly _presetService: CustomDateRangePresetService,
        private readonly _pickerService: CustomDateRangePickerService,
        private readonly _dateFormatService: DateFormatService
    ) {}

    config(config: CustomDateRangeInitOptionsModel): this {
        this._configOptions = config;
        return this;
    }

    init(): void {
        const { autoUpdateInput, availableFeaturesDate, drops, position, single } = this._configOptions;
        const format = this._dateFormatService.shortDateFormat;
        const startDate = this._defaultStartDate;
        const endDate = this._defaultEndDate;

        const options = {
            skipCSS: true,
            locale: {
                format,
                separator: ' - ',
                weekLabel: 'W',
                firstDay: 1,
                ...this._localeTranslatedOptions
            },
            alwaysShowCalendars: true,
            showCustomRangeLabel: false,
            ranges: this._rangesTranslatedOption,
            opens: position,
            drops,
            buttonClasses: 'btn',
            applyButtonClasses: 'btn-main btn-size-base',
            cancelButtonClasses: 'btn-default',
            startDate: startDate?.format(format),
            endDate: endDate?.format(format),
            singleDatePicker: !!single,
            autoUpdateInput,
            autoApply: !!single,
            maxDate: availableFeaturesDate ? undefined : this._customDateRangeService.baseRangeTo
        };
        this._options$.next(options);
    }

    get translateDateRange$(): Observable<LangChangeEvent> {
        return this._translate.onLangChange.pipe(
            tap(() => {
                const newOptions = {
                    ...this._options,
                    locale: {
                        ...this._options.locale,
                        ...this._localeTranslatedOptions
                    },
                    ranges: this._rangesTranslatedOption
                };
                this._options$.next(newOptions);
            }),
            delay(1)
            // tap(() => {
            //     this.setDataPickerLabel2(this.pickerService.datePicker);
            // })
        );
    }

    private get _defaultStartDate(): Moment {
        const { startDate, single } = this._configOptions;
        const date =
            startDate && startDate !== '0000-00-00'
                ? DateUtil.dateToMoment(startDate, 'start', 'day')
                : this._customDateRangeService.baseRangeFrom;

        if (single) {
            return startDate ? date : DateUtil.moment();
        }

        return date;
    }

    private get _defaultEndDate(): Moment {
        const { startDate, endDate, single } = this._configOptions;
        if (single) {
            return startDate ? this._defaultStartDate : DateUtil.moment();
        }

        return endDate && endDate !== '0000-00-00'
            ? DateUtil.dateToMoment(endDate, 'end', 'day')
            : this._customDateRangeService.baseRangeTo;
    }

    private get _options(): BaseObjectModel {
        return this._options$.value;
    }

    private get _rangesTranslatedOption(): any {
        return {
            [this._translate.instant('interface.date.ranges.today')]: CustomDateRangeUtil.dateRangeMap(CustomDateRangeTitleEnum.Today),
            [this._translate.instant('interface.date.ranges.yesterday')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.Yesterday
            ),
            [this._translate.instant('interface.date.ranges.last7Days')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.Last7Days
            ),
            [this._translate.instant('interface.date.ranges.last14Days')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.Last14Days
            ),
            [this._translate.instant('interface.date.ranges.last30Days')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.Last30Days
            ),
            [this._translate.instant('interface.date.ranges.last90Days')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.Last90Days
            ),
            [this._translate.instant('interface.date.ranges.thisMonth')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.ThisMonth
            ),
            [this._translate.instant('interface.date.ranges.lastMonth')]: CustomDateRangeUtil.dateRangeMap(
                CustomDateRangeTitleEnum.LastMonth
            ),
            [this._translate.instant('interface.date.ranges.thisYear')]: CustomDateRangeUtil.dateRangeMap(CustomDateRangeTitleEnum.ThisYear)
        };
    }

    private get _localeTranslatedOptions(): any {
        return {
            applyLabel: this._translate.instant('shared.dictionary.apply'),
            cancelLabel: this._translate.instant('shared.dictionary.cancel'),
            fromLabel: this._translate.instant('interface.date.basic.from'),
            toLabel: this._translate.instant('interface.date.basic.to'),
            customRangeLabel: this._translate.instant('interface.date.ranges.custom'),
            daysOfWeek: [
                this._translate.instant('interface.date.days.su'),
                this._translate.instant('interface.date.days.mo'),
                this._translate.instant('interface.date.days.tu'),
                this._translate.instant('interface.date.days.we'),
                this._translate.instant('interface.date.days.th'),
                this._translate.instant('interface.date.days.fr'),
                this._translate.instant('interface.date.days.sa')
            ],
            monthNames: [
                this._translate.instant('interface.date.month.january'),
                this._translate.instant('interface.date.month.february'),
                this._translate.instant('interface.date.month.march'),
                this._translate.instant('interface.date.month.april'),
                this._translate.instant('interface.date.month.may'),
                this._translate.instant('interface.date.month.june'),
                this._translate.instant('interface.date.month.july'),
                this._translate.instant('interface.date.month.august'),
                this._translate.instant('interface.date.month.september'),
                this._translate.instant('interface.date.month.october'),
                this._translate.instant('interface.date.month.november'),
                this._translate.instant('interface.date.month.december')
            ]
        };
    }
}
