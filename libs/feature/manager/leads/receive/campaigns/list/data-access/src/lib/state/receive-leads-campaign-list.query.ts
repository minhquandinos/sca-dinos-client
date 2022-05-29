import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { LeadsReceiveCampaignListState, ReceiveLeadsCampaignListStore } from './receive-leads-campaign-list.store';

@Injectable()
export class ReceiveLeadsCampaignListQuery extends BaseEntityQuery<LeadsReceiveCampaignListState> {
    constructor(protected override store: ReceiveLeadsCampaignListStore) {
        super(store);
    }
}
