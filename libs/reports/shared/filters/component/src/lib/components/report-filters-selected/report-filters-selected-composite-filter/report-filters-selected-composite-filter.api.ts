import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';
import { GetFilterInterface, QueryHelper } from '@scaleo/shared/services/filters';

import { ExtendedValuesType } from './models/report-filters-selected-composite-filter.model';

@Injectable()
export class ReportFiltersSelectedCompositeFilterApi {
    constructor(private rest: RestApiService) {}

    public getExtendedFilterInfo(
        filters?: GetFilterInterface,
        pluckKey: string = '',
        endpoint: string = null
    ): Observable<ApiResponseWithPagination<ExtendedValuesType[]>> {
        const params = QueryHelper.filtersHttpParams(filters);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.get<ApiResponse<ExtendedValuesType[]>>(endpoint, options).pipe(
            // pluck('body', 'info', pluckKey),
            map((response) => ResponseUtil.pagination<ShortManagerModel>(response.headers, response.body.info[pluckKey]))
        );
    }
}
