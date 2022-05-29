import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerReportReferralListState, ManagerReportReferralListStore } from './manager-report-referral-list.store';

@Injectable()
export class ManagerReportReferralListQuery extends BaseEntityQuery<ManagerReportReferralListState> {
    constructor(protected store: ManagerReportReferralListStore) {
        super(store);
    }
}
