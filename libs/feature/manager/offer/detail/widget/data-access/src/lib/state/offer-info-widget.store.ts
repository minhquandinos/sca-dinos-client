import { Injectable } from '@angular/core';
import { guid, Store } from '@datorama/akita';

import { OfferDetailViewModel } from '../models/offer-detail.model';

export interface OfferDetailWidgetState {
    data: OfferDetailViewModel;
}

const initialState = (): any => ({
    data: undefined
});

@Injectable()
export class OfferInfoWidgetStore extends Store<OfferDetailWidgetState> {
    constructor() {
        super(initialState(), { name: `OfferDetailInfoWidget$-${guid()}`, resettable: true });
    }
}
