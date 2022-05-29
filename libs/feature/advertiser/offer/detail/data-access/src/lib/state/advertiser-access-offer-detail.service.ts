import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseStateService } from '@scaleo/core/state/state';

import { AdvertiserAccessOfferDetailApi } from '../api/advertiser-access-offer-detail.api';
import { AdvertiserAccessOfferViewModel } from '../models/advertiser-access-offer-view.model';
import { AdvertiserAccessOfferDetailQuery } from './advertiser-access-offer-detail.query';
import { AdvertiserAccessOfferDetailStore, AdvertiserAccessOfferViewState } from './advertiser-access-offer-detail.store';

@Injectable()
export class AdvertiserAccessOfferDetailService extends BaseStateService<AdvertiserAccessOfferViewState> {
    constructor(
        private readonly api: AdvertiserAccessOfferDetailApi,
        protected store: AdvertiserAccessOfferDetailStore,
        protected query: AdvertiserAccessOfferDetailQuery
    ) {
        super(store, query);
    }

    view(id: number): Observable<AdvertiserAccessOfferViewModel> {
        return this.observable(
            this.api.view(id).pipe(
                tap((data) => {
                    this.store.update(data);
                })
            )
        );
    }
}
