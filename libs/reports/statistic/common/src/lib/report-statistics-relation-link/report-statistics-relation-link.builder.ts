import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { StatisticModel } from '@scaleo/reports/common';
import { ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { ReportStatisticsDateBuilder } from './report-statistics-date-builder';
import { ReportStatisticsFilterBuilder2 } from './report-statistics-filter-builder2';

// TODO after refactor report service from extends to DI change this class
export class ReportStatisticsRelationLinkBuilder {
    constructor(
        private breakdown: BreakdownEnum,
        private row: StatisticModel,
        private filterData: ReportFiltersDtoModel,
        private newFilters: Partial<ReportFiltersDtoModel>
    ) {}

    filters(): Partial<ReportFiltersDtoModel> {
        return this.concatRecipientNewFilters;
    }

    private get concatRecipientNewFilters(): Partial<ReportFiltersDtoModel> {
        const filter = new ReportStatisticsFilterBuilder2(this.breakdown, this.row, this.filterData);
        const selectedFilters = {
            ...filter.makeFilter,
            ...this.newFilters
        };

        return selectedFilters;
    }

    date(): Pick<CustomDateRangeModel, 'rangeFrom' | 'rangeTo'> {
        const date = new ReportStatisticsDateBuilder(this.breakdown, this.row);

        const dateRange = date.makeDate;
        if (dateRange) {
            return dateRange;
        }

        return undefined;
    }
}
