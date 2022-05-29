import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { ReportAdvertiserPostbacksState, ReportAdvertiserPostbacksStore } from './report-advertiser-postbacks.store';

@Injectable()
export class ReportAdvertiserPostbacksQuery extends BaseReportQuery<ReportAdvertiserPostbacksState> {
    constructor(protected store: ReportAdvertiserPostbacksStore, protected reportsService: ReportsService) {
        super(store, reportsService);
    }
}
