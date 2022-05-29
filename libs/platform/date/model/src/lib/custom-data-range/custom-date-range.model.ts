import { Moment } from 'moment';

import { CustomDateRangeTitleEnum } from './custom-date-range.enum';

export interface CustomDateRangeModel {
    rangeFrom: string;
    rangeTo: string;
    previousRangeFrom?: string;
    previousRangeTo?: string;
    timezone?: string;
    selectedRange?: CustomDateRangeTitleEnum;
    diffDays?: number;
}

export interface RangeMapModel {
    [key: string]: CustomDateRangeTitleEnum;
}

export interface DateModel {
    rangeFrom: Moment;
    rangeTo: Moment;
}

export interface DateStringModel {
    rangeFrom: string;
    rangeTo: string;
}
