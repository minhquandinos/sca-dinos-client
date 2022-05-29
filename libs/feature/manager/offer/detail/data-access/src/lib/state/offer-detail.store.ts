import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { OfferDefaultLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/default/data-access';
import { OfferConfigCountsModel } from '@scaleo/offer/common';

export interface OfferDetailState {
    id: number;
    title: string;
    currency: string;
    counts: OfferConfigCountsModel;
    defaultLandingPage: OfferDefaultLandingPageModel;
}

export const createInitialState = (): OfferDetailState => ({
    id: undefined,
    title: undefined,
    currency: undefined,
    counts: undefined,
    defaultLandingPage: undefined
});

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'manager-offer-detail', resettable: true })
export class OfferDetailStore extends Store<OfferDetailState> {
    constructor() {
        super(createInitialState());
    }
}
