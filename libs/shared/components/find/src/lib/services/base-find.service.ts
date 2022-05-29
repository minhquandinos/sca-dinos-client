import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';

import { BaseFindInterface } from '../interfaces/base-find.interface';

@Injectable({ providedIn: 'root' })
export class BaseFindService<T> implements BaseFindInterface<T> {
    constructor(protected rest: RestApiService, protected url: string, protected resultKey: string) {}

    index(filters: BaseObjectModel): Observable<ApiResponseWithPagination<T[]>> {
        const params = RequestUtil.queryParams(filters);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<T[]>>(this.url, options)
            .pipe(map((response) => ResponseUtil.pagination<T[]>(response.headers, response.body.info[this.resultKey])));
    }
}
