import { DateUtil } from '@scaleo/platform/date/util';

import { StatisticRowType } from '../../../../../../../common/src/lib/model/reports.model';
import { AbstractReportStatisticsChildrenDate } from './abstract-report-statistics-children-date';

export class ReportStatisticsChildrenDateYear extends AbstractReportStatisticsChildrenDate {
    private readonly startYear: string;

    private readonly endYear: string;

    constructor(private item: StatisticRowType, protected dateFrom: string, protected dateTo: string) {
        super(dateFrom, dateTo);
        this.startYear = `${this.item}-01-01`;
        this.endYear = `${this.item}-12-31`;
    }

    from(): string {
        return this.start();
    }

    to(): string {
        return this.end();
    }

    protected start(): string {
        // если даты полностью попадает в диапазон
        if (this.isBetweenDates(this.item as string)) {
            return this.startYear;
        }

        // если дата частично попадает в диапазон и это текущий год
        if (this.isBetweenDate(this.startYear) && this.isCurrentYear) {
            return this.startYear;
        }

        // если дата частично попадает в диапазон и это не текущий год
        if (this.isBetweenDate(this.startYear) && !this.isCurrentYear) {
            const day = DateUtil.moment(this.dateFrom).day();
            const month = DateUtil.moment(this.dateFrom).month();
            return DateUtil.makeDate(`${this.item}-${month}-${day}`);
        }

        return this.dateFrom;
    }

    protected end(): string {
        // если даты полностью попадает в диапазон
        if (this.isBetweenDates(this.endYear)) {
            return DateUtil.endOf(this.startYear, 'year');
        }

        // если дата частично попадает в диапазон и это не текущий год
        if (this.isBetweenDate(this.endYear) && !this.isCurrentYear) {
            return DateUtil.endOf(this.startYear, 'year');
        }

        return this.dateTo;
    }

    private get isCurrentYear(): boolean {
        return DateUtil.moment().year() === this.item;
    }
}
