import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { exportDataUtil } from '@scaleo/utils';

import { AdvertiserListModel, AdvertiserListQueryParamsDto, AdvertisersExportQueryParamsDto } from '../advertiser-list.model';

@Injectable()
export class AdvertiserListApi {
    constructor(private readonly rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    public index(queryParams?: AdvertiserListQueryParamsDto): Observable<ApiResponseWithPagination<AdvertiserListModel[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<AdvertiserListModel[]>>('advertisers-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { advertisers }
                    }
                }) => {
                    const advertisersMapper = this.jsonConvertService.mapper(AdvertiserListModel, advertisers);
                    return ResponseUtil.pagination<AdvertiserListModel[]>(headers, advertisersMapper);
                }
            )
        );
    }

    export(filters: AdvertisersExportQueryParamsDto): Observable<HttpResponse<ArrayBuffer>> {
        const params = RequestUtil.queryParams(filters);
        return exportDataUtil(this.rest, 'advertisers-export', {
            params
        });
    }
}
