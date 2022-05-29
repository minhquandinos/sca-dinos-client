import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';

import { OfferLandingPageListDto, OfferLandingPageListQueryParamsDto } from './offer-landing-page.dto';

@Injectable({
    providedIn: 'root'
})
export class OfferLandingPageApi {
    constructor(private readonly rest: RestApiService, private readonly translate: TranslateService) {}

    index(
        offerId: number,
        queryParams: OfferLandingPageListQueryParamsDto
    ): Observable<ApiResponseWithPagination<OfferLandingPageListDto[]>> {
        const options: RestApiOptions = {
            urlParameters: {
                offerId
            },
            request: {
                observe: 'response',
                params: RequestUtil.queryParams({ ...queryParams, lang: this.translate.currentLang })
            }
        };
        return this.rest.get<ApiResponse<OfferLandingPageListDto[]>>('offer-urls', options).pipe(
            map(({ headers, body: { info } }) => {
                const offers = info['landing-pages'];
                return ResponseUtil.pagination(headers, offers);
            })
        );
    }
}
