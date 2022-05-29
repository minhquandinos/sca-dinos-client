import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RequestUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferTargetingDto } from '@scaleo/offer/common';

import { OfferTargetingEditPayloadDto } from '../models/offer-targeting-edit.model';

@Injectable()
export class OfferTargetingEditApi {
    constructor(private readonly rest: RestApiService, private readonly translate: TranslateService) {}

    update(offerId: number, payload: OfferTargetingEditPayloadDto): Observable<any> {
        const options: RestApiOptions = {
            request: {
                params: RequestUtil.queryParams({ lang: this.translate.currentLang })
            },
            urlParameters: { offerId }
        };

        return this.rest.put<OfferTargetingDto>('offer-targeting', payload, options).pipe(pluck('info', 'targeting'));
    }
}
