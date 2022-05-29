import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OffersSettingsModel } from '../models/offers-settings.model';

@Injectable()
export class OffersSettingsApi {
    constructor(private readonly rest: RestApiService) {}

    view(): Observable<OffersSettingsModel> {
        return this.rest.get<ApiResponse<OffersSettingsModel>>('offers-settings').pipe(pluck('info', 'settings'));
    }

    update(post: OffersSettingsModel): Observable<void> {
        return this.rest.put<OffersSettingsModel>('offers-settings', post);
    }
}
