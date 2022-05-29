import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OfferDetailViewModel } from '../models/offer-detail.model';
import { OfferInfoWidgetApi } from '../offer-info-widget.api';
import { OfferInfoWidgetStore } from './offer-info-widget.store';

@Injectable()
export class OfferInfoWidgetService {
    constructor(private readonly api: OfferInfoWidgetApi, private readonly store: OfferInfoWidgetStore) {}

    view(id: number): Observable<OfferDetailViewModel> {
        return this.api.view(id).pipe(
            tap((data) => {
                this.updateStore(data);
            })
        );
    }

    updateStore(data: OfferDetailViewModel): void {
        this.store.update((): any => ({
            data
        }));
    }

    resetStore(): void {
        this.store.reset();
    }
}
