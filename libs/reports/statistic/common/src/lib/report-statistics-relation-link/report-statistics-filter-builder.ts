import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { StatisticDefaultRowModel, StatisticModel } from '@scaleo/reports/common';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { RequestPayloadFilter2Interface } from '@scaleo/shared/services/filters';

import { ReportStatisticsBreakdownFieldMap } from '../report-statistics-breakdown-field-map';
import { ReportStatisticsBreakdownFilterMap } from '../report-statistics-breakdown-filter-map';
import { isTimeBreakdown } from '../util/new-report-statistics.util';

export class ReportStatisticsFilterBuilder {
    constructor(private breakdown: BreakdownEnum, private row: StatisticModel, private filterData: RequestPayloadFilter2Interface) {}

    get makeFilter(): ReportFilterModel[] {
        if (this.filterData) {
            return this.chainFilters;
        }
        return this.clickedFilter;
    }

    private get clickedFilter(): ReportFilterModel[] {
        if (isTimeBreakdown(this.breakdown) || !this.checkValue) {
            return [];
        }

        return [
            {
                filter: ReportStatisticsBreakdownFilterMap.breakdownFilters(this.breakdown),
                value: this.prepareFilterValue(this.fieldValue, this.breakdown),
                selected: true
            }
        ];
    }

    private get chainFilters(): ReportFilterModel[] {
        return [
            ...this.clickedFilter,
            ...Object.keys(this.filterData)
                .filter((flt) => {
                    const compare = this.clickedFilter.length
                        ? this.clickedFilter.some((clickedFilter) => clickedFilter.filter !== flt)
                        : true;
                    return !!this.filterData[flt] && compare;
                })
                .map((filterName: string) => this.filterData[filterName])
        ];
    }

    private field<T = StatisticDefaultRowModel>(): T {
        const breakdownFiled = ReportStatisticsBreakdownFieldMap.breakdownField(this.breakdown);
        return this.row[breakdownFiled] as T;
    }

    private prepareFilterValue(value: string, breakdown: BreakdownEnum): string[] | number[] | string {
        if (ReportStatisticsBreakdownFilterMap.isBreakdownFilterText(breakdown)) {
            return value as string;
        }

        if (breakdown === BreakdownEnum.PaidToAffiliate) {
            return value.split(',').map((item) => this.transformPaidToAffValue(+item));
        }

        return value.split(',').map((elem) => (typeof +elem === 'number' && !Number.isNaN(+elem) ? +elem : elem)) as number[] | string[];
    }

    private get checkValue(): boolean {
        // because in response desktop value === 0
        const breakdownsWithZeroValue = [BreakdownEnum.DeviceType, BreakdownEnum.PaidToAffiliate];
        if (breakdownsWithZeroValue.includes(this.breakdown)) {
            return !(!this.field() || this.field()?.value === '');
        }

        return !(!this.field() || this.field()?.id === 0 || this.field()?.value === '');
    }

    private get fieldValue(): string {
        if (this.breakdown === BreakdownEnum.PaidToAffiliate) {
            return this.transformPaidToAffValue(this.field()?.id);
        }

        // because in response desktop value === 0
        if (this.breakdown === BreakdownEnum.DeviceType) {
            return this.field()?.id.toString();
        }

        if (this.field()?.id) {
            return this.field()?.id.toString();
        }

        if (this.field()?.value) {
            return this.field()?.value.toString();
        }

        return this.field()?.toString();
    }

    private transformPaidToAffValue(id: number): InvoiceStatusNameEnum {
        return id ? InvoiceStatusNameEnum.Paid : InvoiceStatusNameEnum.Unpaid;
    }
}
