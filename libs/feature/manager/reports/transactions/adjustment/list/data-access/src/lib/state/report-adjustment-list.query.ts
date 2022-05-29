import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ReportAdjustmentListState, ReportAdjustmentListStore } from './report-adjustment-list.store';

@Injectable()
export class ReportAdjustmentListQuery extends BaseEntityQuery<ReportAdjustmentListState> {
    constructor(protected store: ReportAdjustmentListStore) {
        super(store);
    }
}
