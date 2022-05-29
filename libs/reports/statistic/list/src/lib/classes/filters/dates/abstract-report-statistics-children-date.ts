import { DateUtil } from '@scaleo/platform/date/util';

export abstract class AbstractReportStatisticsChildrenDate {
    protected constructor(protected dateFrom: string, protected dateTo: string) {}

    abstract from(): string;

    abstract to(): string;

    protected abstract start(): string;

    protected abstract end(): string;

    protected isBetweenDates(date: string): boolean {
        const compareStart = DateUtil.isBetween(date, this.dateFrom, this.dateTo, 'day');
        const compareEnd = DateUtil.isBetween(date, this.dateFrom, this.dateTo, 'day');

        return compareStart && compareEnd;
    }

    isBetweenDate(date: string): boolean {
        return DateUtil.isBetween(date, this.dateFrom, this.dateTo, 'day');
    }
}
