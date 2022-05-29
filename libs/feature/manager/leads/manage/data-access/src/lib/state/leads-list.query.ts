import { Injectable } from '@angular/core';

import { BaseReportQuery } from '@scaleo/reports/common';
import { ReportsService } from '@scaleo/reports/state';

import { LeadsListState, LeadsListStore } from './leads-list.store';

@Injectable()
export class LeadsListQuery extends BaseReportQuery<LeadsListState> {
    constructor(protected override store: LeadsListStore, protected override reportsService: ReportsService) {
        super(store, reportsService);
    }
}
