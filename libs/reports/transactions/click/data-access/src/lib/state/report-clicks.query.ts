import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { ReportClicksState, ReportClicksStore } from './report-clicks.store';

@Injectable()
export class ReportClicksQuery extends BaseReportQuery<ReportClicksState> {
    constructor(protected store: ReportClicksStore, protected reportsService: ReportsService) {
        super(store, reportsService);
    }
}
