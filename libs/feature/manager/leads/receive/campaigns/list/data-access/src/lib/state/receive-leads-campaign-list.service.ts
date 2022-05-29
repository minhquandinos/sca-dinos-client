import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { ReceiveLeadsCampaignsApi } from '../api/receive-leads-campaigns.api';
import { LeadsReceiveCampaignList } from '../models/leads-receive-campaign-list.model';
import { ReceiveLeadsCampaignListQuery } from './receive-leads-campaign-list.query';
import { LeadsReceiveCampaignListState, ReceiveLeadsCampaignListStore } from './receive-leads-campaign-list.store';

@Injectable()
export class ReceiveLeadsCampaignListService extends BaseEntityService<LeadsReceiveCampaignListState> {
    constructor(
        private api: ReceiveLeadsCampaignsApi,
        protected override query: ReceiveLeadsCampaignListQuery,
        protected override store: ReceiveLeadsCampaignListStore
    ) {
        super(store, query);
    }

    public list(): Observable<LeadsReceiveCampaignList[]> {
        const observable = this.query.selectParams$().pipe(
            delay(200),
            switchMap((queryParams) => this.api.index(queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({
                    pagination
                });
            }),
            pluck('results'),
            tap((campaigns) => {
                this.store.set(campaigns);
                this.store.setLoading(false);
            })
        );

        return this.observable(observable);
    }
}
