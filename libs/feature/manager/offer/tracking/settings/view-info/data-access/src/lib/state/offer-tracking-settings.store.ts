import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';

import { OfferTrackingSettingsModel } from '../models/offer-tracking-settings.model';

export interface OfferTrackingSettingsState {
    data: OfferTrackingSettingsModel;
}

const initialState = (): any => ({
    data: undefined
});

@Injectable()
export class OfferTrackingSettingsStore extends Store<OfferTrackingSettingsState> {
    constructor() {
        super(initialState(), { name: 'OfferTrackingSettings', resettable: true });
    }
}
