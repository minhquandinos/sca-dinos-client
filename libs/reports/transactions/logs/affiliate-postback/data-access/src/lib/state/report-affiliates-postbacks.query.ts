import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { ReportAffiliatesPostbacksState, ReportAffiliatesPostbacksStore } from './report-affiliates-postbacks.store';

@Injectable()
export class ReportAffiliatesPostbacksQuery extends BaseReportQuery<ReportAffiliatesPostbacksState> {
    constructor(protected store: ReportAffiliatesPostbacksStore, protected reportsService: ReportsService) {
        super(store, reportsService);
    }
}
