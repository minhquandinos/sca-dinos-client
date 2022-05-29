import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { OfferTrafficDistributionMethodEnum } from '../enum/offer-traffic-distribution.enum';
import { OfferTrafficDistributionState, OfferTrafficDistributionStore } from './offer-traffic-distribution.store';

@Injectable()
export class OfferTrafficDistributionQuery extends Query<OfferTrafficDistributionState> {
    constructor(protected store: OfferTrafficDistributionStore) {
        super(store);
    }

    get getMethod$(): Observable<OfferTrafficDistributionMethodEnum> {
        return this.select('method');
    }
}
