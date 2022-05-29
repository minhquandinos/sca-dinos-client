import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseStateService } from '@scaleo/core/state/state';

import { AffiliateAccessOfferDetailApi } from '../api/affiliate-access-offer-detail.api';
import { AffiliateAccessOfferViewModel } from '../models/affiliate-access-offer-view.model';
import { AffiliateAccessOfferDetailQuery } from './affiliate-access-offer-detail.query';
import { AffiliateAccessOfferDetailStore, AffiliateAccessOfferViewState } from './affiliate-access-offer-detail.store';

@Injectable()
export class AffiliateAccessOfferDetailService extends BaseStateService<AffiliateAccessOfferViewState> {
    constructor(
        private readonly api: AffiliateAccessOfferDetailApi,
        protected store: AffiliateAccessOfferDetailStore,
        protected query: AffiliateAccessOfferDetailQuery
    ) {
        super(store, query);
    }

    view(id: number): Observable<AffiliateAccessOfferViewModel> {
        return this.observable(
            this.api.view(id).pipe(
                tap((data) => {
                    this.store.update(data);
                })
            )
        );
    }

    offerRequest(offerId: number, answers?: string): Observable<void> {
        return this.api.offerRequest(offerId, answers);
    }
}
