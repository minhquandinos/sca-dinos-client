import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferTrackingSettingsDto } from '@scaleo/feature/manager/offer/tracking/settings/view-info/data-access';

import { OfferTrackingSettingsPayloadDto } from '../model/offer-tracking-settings-edit.model';

@Injectable()
export class OfferTrackingSettingsEditApi {
    constructor(private readonly rest: RestApiService) {}

    update(id: number, data: OfferTrackingSettingsPayloadDto): Observable<OfferTrackingSettingsDto> {
        return this.rest
            .put<ApiResponse<OfferTrackingSettingsDto>>('offer-tracking-settings', data, {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'details'));
    }
}
