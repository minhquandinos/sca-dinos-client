import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { ApiResponse, RequestUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferTrafficDistributionMethodEnum } from '../enum/offer-traffic-distribution.enum';
import {
    OfferTrafficDistributionAbTestingCreatePayloadDto,
    OfferTrafficDistributionABTestingDto,
    OfferTrafficDistributionAbTestingUpdatePayloadDto,
    OfferTrafficDistributionMethodPayloadDto
} from '../models';
import { OfferTrafficDistributionAbTestingQueryParamsDto } from '../models/offer-traffic-distribution-ab-testing';

@Injectable()
export class OfferTrafficDistributionApi {
    constructor(private readonly rest: RestApiService, private readonly offerDetailQuery: OfferDetailQuery) {}

    index(
        offerId: number,
        queryParams: OfferTrafficDistributionAbTestingQueryParamsDto
    ): Observable<OfferTrafficDistributionABTestingDto[]> {
        const params = this.defaultOptions({
            urlParameters: { offerId },
            request: {
                params: RequestUtil.queryParams({ ...queryParams, sortField: 'is_default', sortDirection: 'asc' })
            }
        });

        return this.rest
            .get<ApiResponse<OfferTrafficDistributionABTestingDto[]>>('offer-traffic-distribution', params)
            .pipe(pluck('info', 'traffic-distribution', 'items'));
    }

    create(offerId: number, payload: OfferTrafficDistributionAbTestingCreatePayloadDto): Observable<OfferTrafficDistributionABTestingDto> {
        return this.rest
            .post<ApiResponse<OfferTrafficDistributionABTestingDto>>(
                'offer-traffic-distribution',
                payload,
                this.defaultOptions({ urlParameters: { offerId } })
            )
            .pipe(pluck('info', 'traffic-distribution'));
    }

    update(
        offerId: number,
        id: number,
        payload: OfferTrafficDistributionAbTestingUpdatePayloadDto
    ): Observable<OfferTrafficDistributionABTestingDto> {
        const params = this.defaultOptions({ urlParameters: { id, offerId } });

        return this.rest
            .put<ApiResponse<OfferTrafficDistributionABTestingDto>>('offer-traffic-distribution-self', payload, params)
            .pipe(pluck('info', 'traffic-distribution'));
    }

    delete(offerId: number, id: number): Observable<HttpResponseBase> {
        const params = this.defaultOptions({ urlParameters: { id, offerId } });
        return this.rest.delete<HttpResponseBase>('offer-traffic-distribution-self', params);
    }

    getMethod(offerId: number): Observable<OfferTrafficDistributionMethodEnum> {
        return this.rest
            .get<ApiResponse<BaseIdTitleModel>>('offer-traffic-distribution-method', this.defaultOptions({ urlParameters: { offerId } }))
            .pipe(pluck('info', 'traffic-distribution-method', 'id'));
    }

    updateMethod(offerId: number, payload: OfferTrafficDistributionMethodPayloadDto): Observable<OfferTrafficDistributionMethodEnum> {
        return this.rest
            .put<ApiResponse<BaseIdTitleModel>>(
                'offer-traffic-distribution-method',
                payload,
                this.defaultOptions({ urlParameters: { offerId } })
            )
            .pipe(pluck('info', 'traffic-distribution-method', 'id'));
    }

    private defaultOptions(options: RestApiOptions): RestApiOptions {
        return {
            request: options?.request,
            urlParameters: {
                ...options?.urlParameters
            }
        };
    }
}
