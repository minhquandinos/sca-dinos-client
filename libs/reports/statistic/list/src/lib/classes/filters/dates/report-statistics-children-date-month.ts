import { DateUtil } from '@scaleo/platform/date/util';
import { StatisticRowMonthModel } from '@scaleo/reports/common';

import { AbstractReportStatisticsChildrenDate } from './abstract-report-statistics-children-date';

export class ReportStatisticsChildrenDateMonth extends AbstractReportStatisticsChildrenDate {
    private readonly startMonth: string;

    constructor(private item: StatisticRowMonthModel, protected dateFrom: string, protected dateTo: string) {
        super(dateFrom, dateTo);
        this.startMonth = `${this.item.year}-${this.item.month}-01`;
    }

    from(): string {
        return this.start();
    }

    to(): string {
        return this.end();
    }

    protected start(): string {
        if (this.isBetweenDates(this.startMonth)) {
            return this.startMonth;
        }
        return this.dateFrom;
    }

    protected end(): string {
        const endMonth = DateUtil.endOf(this.startMonth, 'month');
        if (this.isBetweenDates(endMonth)) {
            return endMonth;
        }
        return this.dateTo;
    }
}
