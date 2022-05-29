import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OffersSettingsApi } from '../api/offers-settings.api';
import { OffersSettingsModel } from '../models/offers-settings.model';

@Injectable()
export class OffersSettingsService {
    constructor(private readonly api: OffersSettingsApi) {}

    view(): Observable<OffersSettingsModel> {
        return this.api.view();
    }

    update(post: OffersSettingsModel): Observable<void> {
        return this.api.update(post);
    }
}
