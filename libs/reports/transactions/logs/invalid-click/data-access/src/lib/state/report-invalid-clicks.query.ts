import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { ReportInvalidClicksState, ReportInvalidClicksStore } from './report-invalid-clicks.store';

@Injectable()
export class ReportInvalidClicksQuery extends BaseReportQuery<ReportInvalidClicksState> {
    constructor(protected store: ReportInvalidClicksStore, protected reportsService: ReportsService) {
        super(store, reportsService);
    }
}
