import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';

@Injectable()
export class DashboardToolbarService {
    dateRange$: BehaviorSubject<CustomDateRangeModel> = new BehaviorSubject<CustomDateRangeModel>(null);

    currentDateRange$: Observable<string> = this.setCurrentPeriod();

    previousDateRange$: Observable<string> = this.setPreviousPeriod();

    constructor(
        private customDateRangeService: CustomDateRangeService,
        private translate: TranslateService,
        private formatService: FormatService
    ) {
        this.initDateRange();
    }

    private initDateRange(): void {
        const {
            rangeFrom,
            rangeTo,
            baseSelectedRange: selectedRange,
            baseDiffDays: diffDays,
            previousRangeFrom,
            previousRangeTo
        } = this.customDateRangeService;

        this.dateRange$.next({
            rangeFrom,
            rangeTo,
            selectedRange,
            diffDays,
            previousRangeFrom,
            previousRangeTo
        });
    }

    private setCurrentPeriod(): Observable<string> {
        return this.dateRange$.pipe(
            map(({ rangeFrom, rangeTo, selectedRange }) => {
                const format = this.formatService.shortDateFormat;
                const formatDate: CustomDateRangeModel = {
                    rangeFrom: DateUtil.moment(rangeFrom).format(format),
                    rangeTo: DateUtil.moment(rangeTo).format(format),
                    selectedRange
                };

                return formatDate;
            }),
            switchMap(({ rangeFrom, rangeTo, selectedRange }) => {
                if (selectedRange === CustomDateRangeTitleEnum.Custom) {
                    if (rangeFrom === rangeTo) {
                        return of(rangeFrom);
                    }

                    return of(`${rangeFrom} - ${rangeTo}`);
                }

                return this.translate.stream(`interface.date.ranges.${selectedRange}`);
            })
        );
    }

    private setPreviousPeriod(): Observable<string> {
        return this.dateRange$.pipe(
            map(({ previousRangeFrom, previousRangeTo }) => {
                const format = this.formatService.shortDateFormat;
                const formatDate: { previousRangeFrom: string; previousRangeTo: string } = {
                    previousRangeFrom: DateUtil.moment(previousRangeFrom).format(format),
                    previousRangeTo: DateUtil.moment(previousRangeTo).format(format)
                };

                return formatDate;
            }),
            map(({ previousRangeFrom, previousRangeTo }) => {
                if (previousRangeFrom === previousRangeTo) {
                    return previousRangeFrom;
                }
                return `${previousRangeFrom} - ${previousRangeTo}`;
            })
        );
    }

    get selectedRange(): CustomDateRangeTitleEnum {
        return this.dateRange$.value.selectedRange;
    }

    get selectedDates(): CustomDateRangeModel {
        return this.dateRange$.value;
    }

    get selectedDates$(): Observable<CustomDateRangeModel> {
        return this.dateRange$.pipe(
            map(({ rangeFrom, rangeTo, selectedRange }) => ({
                rangeFrom,
                rangeTo,
                selectedRange
            }))
        );
    }
}
