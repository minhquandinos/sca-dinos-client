import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, ApiResponseWithPagination, RestApiService } from '@scaleo/core/rest-api/service';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { MgcomTopInterface } from '../types/mgcom-top.interface';

@Injectable()
export class MgcomTopApi {
    constructor(private rest: RestApiService) {}

    index(filters: Filter2Interface): Observable<HttpResponse<ApiResponse<ApiResponseWithPagination<MgcomTopInterface[]>>>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        return this.rest.post<ApiResponse<ApiResponseWithPagination<MgcomTopInterface[]>>>('dashboard-mgcom-top', payload, {
            request: { params, observe: 'response' }
        });
    }
}
