import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { AdvertiserListQueryParamsDto } from '@scaleo/feature/manager/advertiser/list/data-access';
import { exportDataUtil } from '@scaleo/utils';

import { AffiliateListExportQueryParamsDto, AffiliateListModel } from '../affiliate-list.model';

@Injectable({ providedIn: 'root' })
export class AffiliateListApi {
    constructor(private readonly rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    public index(queryParams?: AdvertiserListQueryParamsDto): Observable<ApiResponseWithPagination<AffiliateListModel[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<AffiliateListModel[]>>('affiliate-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { affiliates }
                    }
                }) => {
                    const affiliatesMapper = this.jsonConvertService.mapper(AffiliateListModel, affiliates);
                    return ResponseUtil.pagination<AffiliateListModel[]>(headers, affiliatesMapper);
                }
            )
        );
    }

    export(queryParams: AffiliateListExportQueryParamsDto): Observable<HttpResponse<ArrayBuffer>> {
        const params = RequestUtil.queryParams(queryParams);
        return exportDataUtil(this.rest, 'affiliates-export', {
            params
        });
    }
}
