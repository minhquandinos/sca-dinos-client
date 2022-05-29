import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { OffersExportParamsModel } from '@scaleo/offer/common';
import { OfferListApi } from '@scaleo/offer/offers-list/data-access';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { AffiliateOfferListModel, AffiliateOfferListQueryParamsDto } from '../models/affiliate-offer-list.model';

@Injectable()
export class AffiliateOfferListApi {
    constructor(
        protected readonly rest: RestApiService,
        private readonly pathFileService: PathFileService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly api: OfferListApi
    ) {}

    index(queryParams: AffiliateOfferListQueryParamsDto): Observable<ApiResponseWithPagination<AffiliateOfferListModel[]>> {
        return this.api.index<AffiliateOfferListModel, AffiliateOfferListQueryParamsDto>(queryParams).pipe(
            map(({ results, pagination }) => {
                const newResults = results.map((obj: AffiliateOfferListModel) => ({
                    ...obj,
                    image: this.pathFileService.platformImage(obj.image, 'offers')
                }));

                const offers = this.jsonConvertService.mapper<AffiliateOfferListModel>(AffiliateOfferListModel, newResults);

                return {
                    results: offers,
                    pagination
                };
            })
        );
    }

    export(filters: OffersExportParamsModel): Observable<HttpResponse<ArrayBuffer>> {
        return this.api.export(filters);
    }
}
