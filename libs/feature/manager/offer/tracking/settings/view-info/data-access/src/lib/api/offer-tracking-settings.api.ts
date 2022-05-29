import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferTrackingSettingsDto } from '../models/offer-tracking-settings.model';

@Injectable()
export class OfferTrackingSettingsApi {
    constructor(private readonly rest: RestApiService) {}

    view(id: number): Observable<OfferTrackingSettingsDto> {
        return this.rest
            .get<ApiResponse<OfferTrackingSettingsDto>>('offer-tracking-settings', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'details'));
    }
}
