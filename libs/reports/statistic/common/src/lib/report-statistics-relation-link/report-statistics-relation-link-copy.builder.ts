import { BaseObjectModel } from '@scaleo/core/data';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { StatisticModel } from '@scaleo/reports/common';
import { ReportFilter, ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ReportStatisticsDateBuilder } from './report-statistics-date-builder';
import { ReportStatisticsFilterBuilder } from './report-statistics-filter-builder';

// TODO after refactor report service from extends to DI change this class
export class ReportStatisticsRelationLinkBuilder {
    constructor(
        private breakdown: BreakdownEnum,
        private row: StatisticModel,
        private filterData: RequestPayloadFilter2Interface,
        private newFilters: ReportFilterModel[] = [],
        private hostFilters: ReportFilterModel[] = []
    ) {}

    filters(): BaseObjectModel {
        // ReportFilterModel[]
        const selectedFilters = this.concatRecipientHostFilters;

        // if (selectedFilters) {
        //     this.recipientService.updateDataValue({
        //         selectedFilters
        //     });
        // }

        return selectedFilters.reduce((acc: BaseObjectModel, item) => {
            const newValue = Array.isArray(item.value) ? item.value.join(',') : item.value;
            acc[item.key] = newValue;
            return acc;
        }, {});
    }

    private get concatRecipientNewFilters(): ReportFilterModel[] {
        const filter = new ReportStatisticsFilterBuilder(this.breakdown, this.row, this.filterData);
        const selectedFilters = [...filter.makeFilter, ...this.newFilters];

        // if (selectedFilters) {
        //     const recipientFilters = this.recipientService
        //         .getDataValue('selectedFilters')
        //         .filter((elem: any) => elem.isSaved)
        //         .map((elem: any) => ({
        //             ...elem,
        //             value: Array.isArray(elem.value) ? [] : undefined
        //         }));
        //     return ReportFilter.appendNewFilterValue2(recipientFilters, [...selectedFilters, ...this.newFilters]);
        // }
        return selectedFilters;
    }

    private get concatRecipientHostFilters(): ReportFilterModel[] {
        if (this.hostFilters.length > 0) {
            return ReportFilter.appendNewFilterValue2(this.hostFilters, this.concatRecipientNewFilters);
        }
        return this.concatRecipientNewFilters;
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
