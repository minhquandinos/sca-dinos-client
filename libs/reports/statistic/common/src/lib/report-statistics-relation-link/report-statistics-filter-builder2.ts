import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { StatisticDefaultRowModel, StatisticModel } from '@scaleo/reports/common';
import { ReportFiltersDtoModel } from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { Util } from '@scaleo/utils';

import { ReportStatisticsBreakdownFieldMap } from '../report-statistics-breakdown-field-map';
import { ReportStatisticsBreakdownFilterMap } from '../report-statistics-breakdown-filter-map';
import { isTimeBreakdown } from '../util/new-report-statistics.util';

export class ReportStatisticsFilterBuilder2 {
    constructor(private breakdown: BreakdownEnum, private row: StatisticModel, private filterData: ReportFiltersDtoModel) {}

    get makeFilter(): Partial<ReportFiltersDtoModel> {
        if (this.filterData) {
            return this.chainFilters;
        }
        return this.clickedFilter;
    }

    private get clickedFilter(): Partial<ReportFiltersDtoModel> {
        if (isTimeBreakdown(this.breakdown) || !this.checkValue) {
            return {};
        }

        return {
            [ReportStatisticsBreakdownFilterMap.breakdownFilters(this.breakdown)]: this.prepareFilterValue(this.fieldValue, this.breakdown)
        };
    }

    private get chainFilters(): Partial<ReportFiltersDtoModel> {
        const filters: ReportFiltersDtoModel = {
            ...this.filterData,
            ...this.clickedFilter
        };

        const entries = Object.entries(filters).filter(([, value]) => {
            return Util.isNotEmpty(value);
        });
        return Object.fromEntries(entries);
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
