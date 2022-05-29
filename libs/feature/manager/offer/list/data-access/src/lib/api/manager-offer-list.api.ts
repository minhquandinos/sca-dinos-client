import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { OffersExportParamsModel } from '@scaleo/offer/common';
import { OfferListApi } from '@scaleo/offer/offers-list/data-access';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { ManagerOfferListModel, ManagerOfferListQueryParamsDto } from '../models/manager-offer-list.model';

@Injectable()
export class ManagerOfferListApi {
    constructor(
        protected readonly rest: RestApiService,
        private readonly pathFileService: PathFileService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly api: OfferListApi
    ) {}

    index(queryParams: ManagerOfferListQueryParamsDto): Observable<ApiResponseWithPagination<ManagerOfferListModel[]>> {
        return this.api.index<ManagerOfferListModel, ManagerOfferListQueryParamsDto>(queryParams).pipe(
            map(({ results, pagination }) => {
                const newResults = results.map((obj: ManagerOfferListModel) => ({
                    ...obj,
                    image: this.pathFileService.platformImage(obj.image, 'offers')
                }));

                const offers = this.jsonConvertService.mapper<ManagerOfferListModel>(ManagerOfferListModel, newResults);

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
