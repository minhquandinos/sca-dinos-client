import { CustomDateRangeModel } from '@scaleo/platform/date/model';

export interface ReportStatisticsChildrenFilterDateModel {
    parent: CustomDateRangeModel;
    children: {
        rangeFrom: string;
        rangeTo: string;
    };
}
