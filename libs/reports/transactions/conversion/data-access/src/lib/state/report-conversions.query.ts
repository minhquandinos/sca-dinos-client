import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { ReportConversionsState, ReportConversionsStore } from './report-conversions.store';

@Injectable()
export class ReportConversionsQuery extends BaseReportQuery<ReportConversionsState> {
    constructor(protected store: ReportConversionsStore, protected reportsService: ReportsService) {
        super(store, reportsService);
    }
}
