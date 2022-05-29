import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { isMoment, Moment, unix } from 'moment';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { FormatServiceInterface } from '@scaleo/platform/format/service';

type GranularityType = 'month' | 'day' | 'year';

type StartOrEndType = 'start' | 'end';

type LastDayType = 'year' | 'today';

const BASE_FORMAT = 'YYYY-MM-DD';

export class DateUtil {
    static date(startDate: string | Date | Moment): Moment {
        if (typeof startDate === 'string' || startDate instanceof Date) {
            return moment(startDate);
        }
        return startDate;
    }

    // static endOf(startDate: string, endOf: EndOfType, format: string): string;
    // static endOf(startDate: string, endOf: 'year', lastDay: LastDayType, format: string);
    static endOf(startDate: string | Date | Moment, endOf: GranularityType, format = 'YYYY-MM-DD'): string {
        let newDate: Moment = moment();
        if (typeof startDate === 'string' || startDate instanceof Date) {
            newDate = moment(startDate);
        }

        if (endOf === 'year' && newDate.year() === moment().year()) {
            return moment().format(format);
        }

        return newDate.endOf(endOf).format(format);
    }

    static dateToMoment(date: string): Moment;
    static dateToMoment(date: string, startOrEnd: StartOrEndType, granularity: GranularityType): Moment;
    static dateToMoment(date: string, startOrEnd?: any, granularity?: any): Moment {
        const momentDate = moment(date);
        if (startOrEnd === 'start') {
            return momentDate.startOf(granularity);
        }

        if (startOrEnd === 'end') {
            return momentDate.endOf(granularity);
        }

        return momentDate;
    }

    static makeDate(date: string | Moment, format = BASE_FORMAT): string {
        if (isMoment(date)) {
            return date.format(format);
        }
        return moment(date).format(format);
    }

    static now(format = BASE_FORMAT): string {
        return moment().format(format);
    }

    static isBetween(date: string, start: string, end: string, granularity: 'year' | 'month' | 'day'): boolean {
        let startDate = moment(start);
        let endDate = moment(end);

        switch (granularity) {
            case 'year':
                startDate = startDate.startOf('year');
                endDate = endDate.endOf('year');
                break;
            case 'month':
                startDate = startDate.startOf('month');
                endDate = endDate.endOf('month');
                break;
            case 'day':
                startDate = startDate.startOf('day');
                endDate = endDate.endOf('day');
                break;
            default:
                break;
        }

        return moment(date).isBetween(startDate, endDate, granularity);
    }

    static moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, ...args: any[]): Moment {
        return moment(inp, format, ...args);
    }

    static unix(timestamp: number, format = BASE_FORMAT): string {
        return unix(timestamp).format(format);
    }

    static periodLabel<S = any>(
        date$: Observable<CustomDateRangeModel>,
        translateService: TranslateService,
        formatService: FormatServiceInterface
    ): Observable<string> {
        return date$.pipe(
            map((value) => {
                const format = formatService.shortDateFormat;
                const formatDate: CustomDateRangeModel = {
                    ...value,
                    rangeFrom: moment(value.rangeFrom).format(format),
                    rangeTo: moment(value.rangeTo).format(format)
                };

                return formatDate;
            }),
            switchMap((value) => {
                if (value.selectedRange === CustomDateRangeTitleEnum.Custom) {
                    if (value.rangeFrom === value.rangeTo) {
                        return of(value.rangeFrom);
                    }

                    return of(`${value.rangeFrom} - ${value.rangeTo}`);
                }
                return translateService.stream(`interface.date.ranges.${value.selectedRange}`);
            })
        );
    }

    static hasTime(date: string): boolean {
        return /([0-9]{2}[:][0-9]{2})/.test(date);
    }

    static hasFullTime(date: string): boolean {
        return /([0-9]{2}[:][0-9]{2}[:][0-9]{2})/.test(date);
    }

    static onlyTime(date: string): boolean {
        return /^([0-9]{2}[:][0-9]{2})/.test(date);
    }

    static onlyFullTime(date: string): boolean {
        return /^([0-9]{2}[:][0-9]{2}[:][0-9]{2})/.test(date);
    }

    static isDateString(date: string): boolean {
        return /^([0-9]{4}[-][0-9]{2}[-][0-9]{2})/.test(date);
    }

    static isDateUnixTime(date: string | number): boolean {
        return !DateUtil.isDateString(date.toString()) && typeof +date === 'number';
    }
}
