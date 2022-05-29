import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferCustomParamsWidgetState, OfferCustomParamsWidgetStore } from './offer-custom-params-widget.store';

@Injectable()
export class OfferCustomParamsWidgetQuery extends BaseEntityQuery<OfferCustomParamsWidgetState> {
    constructor(protected readonly store: OfferCustomParamsWidgetStore) {
        super(store);
    }
}
