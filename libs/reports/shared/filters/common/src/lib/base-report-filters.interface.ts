import { Observable } from 'rxjs';

import { ReportFilterModel, ReportFiltersInterface } from './filter';

export abstract class GetReportFiltersInterface {
    abstract get getFilters$(): Observable<ReportFiltersInterface[]>;
}

export abstract class ReportFiltersSelectedInterface {
    abstract get filtersSelected$(): Observable<ReportFilterModel[]>;
}
