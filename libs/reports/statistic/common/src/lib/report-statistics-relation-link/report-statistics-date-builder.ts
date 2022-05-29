import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { DateUtil } from '@scaleo/platform/date/util';
import { StatisticDefaultRowModel, StatisticModel, StatisticRowMonthModel } from '@scaleo/reports/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { ReportStatisticsBreakdownFieldMap } from '../report-statistics-breakdown-field-map';

export class ReportStatisticsDateBuilder {
    constructor(private breakdown: BreakdownEnum, private row: StatisticModel) {}

    get makeDate(): CustomDateRangeModel {
        if (this.breakdown === BreakdownEnum.Hour) {
            const day: string = this.field().toString();
            return {
                rangeFrom: day,
                rangeTo: day
            };
        }

        if (this.breakdown === BreakdownEnum.Day) {
            const day: string = this.field().toString();
            return {
                rangeFrom: day,
                rangeTo: day
            };
        }

        if (this.breakdown === BreakdownEnum.Month) {
            const month: StatisticRowMonthModel = this.field<StatisticRowMonthModel>();
            const thisMonth = DateUtil.now('M') === DateUtil.makeDate(`${month.year}-${month.month}-01`, 'M');
            return {
                rangeFrom: DateUtil.makeDate(`${month.year}-${month.month}-01`),
                rangeTo: thisMonth ? DateUtil.now() : DateUtil.endOf(`${month.year}-${month.month}-01`, 'month')
            };
        }

        if (this.breakdown === BreakdownEnum.Year) {
            const year: string = this.field().toString();
            return {
                rangeFrom: `${year}-01-01`,
                rangeTo: DateUtil.endOf(`${year}-01-01`, 'year')
            };
        }

        return null;
    }

    private field<T = StatisticDefaultRowModel>(): T {
        const breakdownFiled = ReportStatisticsBreakdownFieldMap.breakdownField(this.breakdown);
        return this.row[breakdownFiled] as T;
    }
}
