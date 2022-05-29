import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import {
    TopAffiliatesRequestDtoType,
    WidgetTopAffiliateRowsModel
} from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/common';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Injectable({ providedIn: 'root' })
export class TopAffiliatesApi {
    constructor(private readonly rest: RestApiService) {}

    index(requests: TopAffiliatesRequestDtoType): Observable<WidgetTopAffiliateRowsModel[]> {
        const { payload, params } = requests;
        const queryParams = RequestUtil.queryParams(params);

        return this.rest
            .post<ApiResponse<WidgetTopAffiliateRowsModel[]>>('dashboard-statistics-top-affiliates', payload, {
                request: { params: queryParams }
            })
            .pipe(
                map(({ info: { rows = [] } = {} }) => rows),
                rxjsOperatorsUtil.emptyResponseOnCatchError({
                    pagination: undefined,
                    results: []
                })
            );
    }
}
