import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OfferTargetingDto, OfferTargetingModel } from '@scaleo/offer/common';

import { OfferTargetingApi } from '../api/offer-targeting.api';
import { OfferTargetingWidgetStore } from './offer-targeting-widget.store';

@Injectable()
export class OfferTargetingWidgetService {
    constructor(private readonly api: OfferTargetingApi, private readonly store: OfferTargetingWidgetStore) {}

    view(offerId: number): Observable<OfferTargetingModel> {
        return this.api.view(offerId).pipe(
            tap((response) => {
                this.store.update(response);
            })
        );
    }

    updateStore(response: OfferTargetingDto): void {
        this.store.update(response);
    }
}
