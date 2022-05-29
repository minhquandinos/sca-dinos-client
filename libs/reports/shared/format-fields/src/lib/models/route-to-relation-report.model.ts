import { StatisticModel } from '@scaleo/reports/common';
import { ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

export interface RelationReportModel {
    path: string;
    breakdown: BreakdownEnum;
    item: StatisticModel;
    filterData: ReportFiltersDtoModel;
    newFilters?: Partial<ReportFiltersDtoModel>;
}
