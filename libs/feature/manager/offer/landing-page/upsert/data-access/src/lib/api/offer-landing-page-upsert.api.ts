import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, OperatorFunction } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferLandingPageUpsertDto, OfferLandingPageUpsertPayloadDto } from '../models/offer-landing-page-upsert.model';

@Injectable()
export class OfferLandingPageUpsertApi {
    constructor(
        private readonly rest: RestApiService,
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly translate: TranslateService
    ) {}

    store(payload: OfferLandingPageUpsertPayloadDto): Observable<OfferLandingPageUpsertDto> {
        return this.rest
            .post<ApiResponse<OfferLandingPageUpsertDto>>('offer-url-create', payload, this.restOptions())
            .pipe(OfferLandingPageUpsertApi.getObject);
    }

    view(id: number): Observable<OfferLandingPageUpsertDto> {
        return this.rest
            .get<ApiResponse<OfferLandingPageUpsertDto[]>>('offer-url', this.restOptions(id))
            .pipe(OfferLandingPageUpsertApi.getObject);
    }

    update(id: number, payload: OfferLandingPageUpsertPayloadDto): Observable<OfferLandingPageUpsertDto> {
        return this.rest
            .put<ApiResponse<OfferLandingPageUpsertDto>>('offer-url', payload, this.restOptions(id))
            .pipe(OfferLandingPageUpsertApi.getObject);
    }

    delete(id: number): Observable<unknown> {
        return this.rest.delete<ApiResponse<void>>('offer-url', this.restOptions(id)).pipe(OfferLandingPageUpsertApi.getObject);
    }

    private static get getObject(): OperatorFunction<any, OfferLandingPageUpsertDto> {
        return pluck('info', 'landing-page');
    }

    private get offerId(): number {
        return this.offerDetailQuery.id;
    }

    private restOptions(id?: number): RestApiOptions {
        return {
            urlParameters: {
                offerId: this.offerId,
                id
            },
            request: {
                params: RequestUtil.queryParams({ lang: this.translate.currentLang })
            }
        };
    }
}
