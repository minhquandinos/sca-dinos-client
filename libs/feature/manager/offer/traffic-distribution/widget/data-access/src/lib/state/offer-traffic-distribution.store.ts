import { Injectable } from '@angular/core';
import { guid, Store } from '@datorama/akita';

import { OfferTrafficDistributionMethodEnum } from '../enum/offer-traffic-distribution.enum';
import { OfferTrafficDistributionModel } from '../models';

export interface OfferTrafficDistributionState extends OfferTrafficDistributionModel {
    distribution: number;
    queryParams: {
        rangeFrom: string;
        rangeTo: string;
    };
}

const initialState = (): OfferTrafficDistributionState => ({
    method: OfferTrafficDistributionMethodEnum.None,
    items: [],
    distribution: 100,
    queryParams: undefined
});

@Injectable()
export class OfferTrafficDistributionStore extends Store<OfferTrafficDistributionState> {
    constructor() {
        super(initialState(), { name: `OfferTrafficDistributionWidget-${guid()}` });
    }
}
