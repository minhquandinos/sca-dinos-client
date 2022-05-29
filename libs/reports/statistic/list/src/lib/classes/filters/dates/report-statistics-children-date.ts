import { StatisticRowHourModel, StatisticRowMonthModel, StatisticRowType } from '@scaleo/reports/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';

import { ReportStatisticsChildrenDateMonth } from './report-statistics-children-date-month';
import { ReportStatisticsChildrenDateYear } from './report-statistics-children-date-year';
import { ReportStatisticsChildrenFilterDateModel } from './report-statistics-children-filter-date.model';

export class ReportStatisticsChildrenDate {
    private readonly dateFrom: string;

    private readonly dateTo: string;

    year: ReportStatisticsChildrenDateYear;

    month: ReportStatisticsChildrenDateMonth;

    constructor(
        private nextBreakdown: BreakdownEnum,
        private currentBreakdown: BreakdownEnum,
        private item: StatisticRowType,
        private date: ReportStatisticsChildrenFilterDateModel
    ) {
        this.dateFrom = date?.parent?.rangeFrom || date?.children?.rangeFrom;
        this.dateTo = date?.parent?.rangeTo || date?.children?.rangeTo;

        this.year = new ReportStatisticsChildrenDateYear(item, this.dateFrom, this.dateTo);
        this.month = new ReportStatisticsChildrenDateMonth(item as StatisticRowMonthModel, this.dateFrom, this.dateTo);
    }

    get rangeFrom(): string {
        switch (this.currentBreakdown) {
            case BreakdownEnum.Year:
                return this.year.from();
            case BreakdownEnum.Month:
                return this.month.from();
            case BreakdownEnum.Day:
                return this.item as string;
            case BreakdownEnum.Hour:
                return (this.item as StatisticRowHourModel).date;
            default:
                return this.nextBreakdown === BreakdownEnum.Hour ? this.dateTo : this.dateFrom;
        }
    }

    get rangeTo(): string {
        switch (this.currentBreakdown) {
            case BreakdownEnum.Year:
                return this.year.to();
            case BreakdownEnum.Month:
                return this.month.to();
            case BreakdownEnum.Day:
                return this.item as string;
            case BreakdownEnum.Hour:
                return (this.item as StatisticRowHourModel).date;
            default:
                return this.dateTo;
        }
    }
}
