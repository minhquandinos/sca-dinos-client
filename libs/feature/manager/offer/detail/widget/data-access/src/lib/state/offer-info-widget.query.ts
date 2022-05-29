import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { OfferDetailViewModel } from '../models/offer-detail.model';
import { OfferDetailWidgetState, OfferInfoWidgetStore } from './offer-info-widget.store';

@Injectable()
export class OfferInfoWidgetQuery extends Query<OfferDetailWidgetState> {
    constructor(protected readonly store: OfferInfoWidgetStore) {
        super(store);
    }

    get data$(): Observable<OfferDetailViewModel> {
        return this.select('data');
    }

    get data(): OfferDetailViewModel {
        return this.getValue().data;
    }
}
