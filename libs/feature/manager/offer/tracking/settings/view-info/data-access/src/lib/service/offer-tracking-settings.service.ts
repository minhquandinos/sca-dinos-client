import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { OfferTrackingSettingsApi } from '../api/offer-tracking-settings.api';
import { OfferTrackingSettingsModel } from '../models/offer-tracking-settings.model';
import { OfferTrackingSettingsStore } from '../state/offer-tracking-settings.store';

@Injectable()
export class OfferTrackingSettingsService {
    constructor(private readonly api: OfferTrackingSettingsApi, private readonly store: OfferTrackingSettingsStore) {}

    view(id: number): Promise<OfferTrackingSettingsModel> {
        return this.api
            .view(id)
            .pipe(
                tap((data: OfferTrackingSettingsModel) => {
                    this.updateStore(data);
                })
            )
            .toPromise();
    }

    resetStore(): void {
        this.store.reset();
    }

    updateStore(data: OfferTrackingSettingsModel): void {
        this.store.update((): any => ({
            data
        }));
    }
}
