import { ReportFilterValueType } from '../models/report-filters.model';

export class ReportFiltersUtil {
    static prepareValue(value: ReportFilterValueType): ReportFilterValueType {
        return typeof value === 'string' ? ReportFiltersUtil.clearEmptyValue(value) : value;
    }

    static clearEmptyValue(value: string): string {
        return value.replace(/\r\n$/, '');
    }
}
