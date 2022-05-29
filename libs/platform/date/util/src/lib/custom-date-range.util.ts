import * as moment from 'moment';
import { Moment } from 'moment';

import { CustomDateRangeTitleEnum, CustomDateRangeTranslateEnum, DateModel, DateStringModel } from '@scaleo/platform/date/model';

export class CustomDateRangeUtil {
    static countDiffDate(date: DateModel): number {
        const { rangeFrom, rangeTo } = date;
        const diff = rangeTo.diff(rangeFrom, 'days');
        return diff === 0 ? 1 : diff + 1;
    }

    static previousDateFromCurrentDate(
        date: Moment,
        period: number,
        format: string,
        rangePeriod?: { preset: CustomDateRangeTitleEnum; start?: boolean }
    ): string {
        if (rangePeriod.preset === CustomDateRangeTitleEnum.ThisYear) {
            const newDate = rangePeriod.start
                ? date.clone().subtract(period, 'days').startOf('year')
                : date.clone().subtract(1, 'year').endOf('year');

            return newDate.format(format);
        }
        if ([CustomDateRangeTitleEnum.ThisMonth, CustomDateRangeTitleEnum.LastMonth].includes(rangePeriod.preset)) {
            const newDate = rangePeriod.start
                ? date.clone().subtract(1, 'month').startOf('month')
                : date.clone().subtract(1, 'month').endOf('month');

            return newDate.format(format);
        }
        return date.clone().subtract(period, 'days').format(format);
    }

    static dateRangeMap(range: CustomDateRangeTitleEnum): Moment[] {
        switch (range) {
            case CustomDateRangeTitleEnum.Today:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Today);
            case CustomDateRangeTitleEnum.Yesterday:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Yesterday);
            case CustomDateRangeTitleEnum.Last7Days:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Last7Days);
            case CustomDateRangeTitleEnum.Last14Days:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Last14Days);
            case CustomDateRangeTitleEnum.Last30Days:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Last30Days);
            case CustomDateRangeTitleEnum.Last90Days:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.Last90Days);
            case CustomDateRangeTitleEnum.ThisMonth:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.ThisMonth);
            case CustomDateRangeTitleEnum.LastMonth:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.LastMonth);
            case CustomDateRangeTitleEnum.ThisYear:
                return CustomDateRangeUtil.getPresetDateArray(CustomDateRangeTitleEnum.ThisYear);
            default:
                return null;
        }
    }

    static getPresetDate(preset: CustomDateRangeTitleEnum): DateModel {
        return CustomDateRangeUtil.presetDateMap[preset] || undefined;
    }

    private static getPresetDateArray(preset: CustomDateRangeTitleEnum): Moment[] {
        const date = CustomDateRangeUtil.getPresetDate(preset);
        return [date.rangeFrom, date.rangeTo] || undefined;
    }

    static getPresetDateString(preset: CustomDateRangeTitleEnum, format: string): DateStringModel {
        const date = CustomDateRangeUtil.getPresetDate(preset);
        if (date) {
            return {
                rangeFrom: date.rangeFrom.format(format),
                rangeTo: date.rangeTo.format(format)
            };
        }
        return undefined;
    }

    private static get presetDateMap(): { [key in CustomDateRangeTitleEnum]: DateModel } {
        return {
            [CustomDateRangeTitleEnum.Today]: {
                rangeFrom: moment(),
                rangeTo: moment()
            },
            [CustomDateRangeTitleEnum.Yesterday]: {
                rangeFrom: moment().subtract(1, 'days'),
                rangeTo: moment().subtract(1, 'days')
            },
            [CustomDateRangeTitleEnum.Last7Days]: {
                rangeFrom: moment().subtract(6, 'days'),
                rangeTo: moment()
            },
            [CustomDateRangeTitleEnum.Last14Days]: {
                rangeFrom: moment().subtract(13, 'days'),
                rangeTo: moment()
            },
            [CustomDateRangeTitleEnum.Last30Days]: {
                rangeFrom: moment().subtract(29, 'days'),
                rangeTo: moment()
            },
            [CustomDateRangeTitleEnum.Last90Days]: {
                rangeFrom: moment().subtract(89, 'days'),
                rangeTo: moment()
            },
            [CustomDateRangeTitleEnum.ThisMonth]: {
                rangeFrom: moment().startOf('month').hour(0).minute(0).second(0),
                rangeTo: moment().endOf('day').hour(23).minute(59).second(59)
            },
            [CustomDateRangeTitleEnum.LastMonth]: {
                rangeFrom: moment().subtract(1, 'month').startOf('month'),
                rangeTo: moment().subtract(1, 'month').endOf('month')
            },
            [CustomDateRangeTitleEnum.ThisYear]: {
                rangeFrom: moment().startOf('year'),
                rangeTo: moment().endOf('day')
            },
            [CustomDateRangeTitleEnum.Custom]: {
                rangeFrom: undefined,
                rangeTo: undefined
            }
        };
    }

    static dateIsPreset(start: Moment, end: Moment): CustomDateRangeTitleEnum | undefined {
        const presetMap = CustomDateRangeUtil.presetDateMap;

        const find = Object.keys(presetMap).find((preset) => {
            const singlePreset = (presetMap as any)?.[preset];
            if (singlePreset?.rangeFrom && singlePreset?.rangeTo) {
                const { rangeFrom, rangeTo } = singlePreset;
                return rangeFrom.isSame(start, 'day') && rangeTo.isSame(end, 'day');
            }

            return false;
        });

        return find as CustomDateRangeTitleEnum;
    }

    static labelPresetTranslate(preset: CustomDateRangeTitleEnum): string {
        const map: Omit<Record<CustomDateRangeTitleEnum, CustomDateRangeTranslateEnum>, CustomDateRangeTitleEnum.Custom> = {
            [CustomDateRangeTitleEnum.Today]: CustomDateRangeTranslateEnum.Today,
            [CustomDateRangeTitleEnum.Yesterday]: CustomDateRangeTranslateEnum.Yesterday,
            [CustomDateRangeTitleEnum.Last7Days]: CustomDateRangeTranslateEnum.Last7Days,
            [CustomDateRangeTitleEnum.Last14Days]: CustomDateRangeTranslateEnum.Last14Days,
            [CustomDateRangeTitleEnum.Last30Days]: CustomDateRangeTranslateEnum.Last30Days,
            [CustomDateRangeTitleEnum.Last90Days]: CustomDateRangeTranslateEnum.Last90Days,
            [CustomDateRangeTitleEnum.ThisMonth]: CustomDateRangeTranslateEnum.ThisMonth,
            [CustomDateRangeTitleEnum.LastMonth]: CustomDateRangeTranslateEnum.LastMonth,
            [CustomDateRangeTitleEnum.ThisYear]: CustomDateRangeTranslateEnum.ThisYear
        };
        return (map as any)?.[preset];
    }
}
