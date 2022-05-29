import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';

import { AffiliatePostbackListModel, AffiliatePostbackListQueryParamsDto } from './postback-list.model';

@Injectable({ providedIn: 'root' })
export class PostbackListApi {
    constructor(
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformListsService: PlatformListsService
    ) {}

    index(
        affiliateId: number,
        queryParams: AffiliatePostbackListQueryParamsDto
    ): Observable<ApiResponseWithPagination<AffiliatePostbackListModel>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            urlParameters: { affiliateId },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<AffiliatePostbackListModel>>('postbacks-list', options).pipe(
            switchMap(({ headers, body }) =>
                this.platformListsService.platformListsNew('postback_levels,postback_tracking_methods').pipe(
                    map((platformList) => {
                        const results = this.jsonConvertService.mapper(AffiliatePostbackListModel, body.info.postbacks);
                        const newResults = results.map((postback: AffiliatePostbackListModel) => {
                            const typeName =
                                postback.type !== 0
                                    ? platformList.postback_tracking_methods
                                          .find((type: any) => type.id === postback.type)
                                          .title.split(' ')[0]
                                    : null;

                            const postbackLevelsName =
                                postback.level_id !== 0
                                    ? platformList.postback_levels.find((level: any) => level.id === postback.level_id)
                                    : null;

                            return {
                                ...postback,
                                level_name: postbackLevelsName ? postbackLevelsName.title : null,
                                type_name: typeName ? `list_table_${typeName}` : ''
                            };
                        });

                        return ResponseUtil.pagination<AffiliatePostbackListModel>(headers, newResults);
                    })
                )
            )
        );
    }
}
