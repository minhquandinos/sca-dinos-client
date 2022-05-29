import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferTargetingDto } from '@scaleo/offer/common';

@Injectable()
export class OfferTargetingApi {
    constructor(private readonly rest: RestApiService, private readonly translate: TranslateService) {}

    view(offerId: number): Observable<OfferTargetingDto> {
        const params = RequestUtil.queryParams({
            lang: this.translate.currentLang
        });

        return this.rest
            .get<ApiResponse<OfferTargetingDto>>('offer-targeting', {
                urlParameters: { offerId },
                request: {
                    params
                }
            })
            .pipe(pluck('info', 'targeting'));
    }
}
