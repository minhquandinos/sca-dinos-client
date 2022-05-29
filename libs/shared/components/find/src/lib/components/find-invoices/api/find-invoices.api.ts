import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShortResponseInterface } from '@scaleo/core/data';
import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { BaseFindRequestModel } from '@scaleo/shared/components/find';

@Injectable()
export class FindInvoicesApi {
    constructor(private rest: RestApiService) {}

    index(queryParams: BaseFindRequestModel): Observable<ApiResponseWithPagination<ShortResponseInterface[]>> {
        const options: RestApiOptions = {
            request: {
                params: RequestUtil.queryParams(queryParams),
                observe: 'response'
            }
        };
        return this.rest.get<ApiResponse<ShortResponseInterface[]>>('billing-invoice-get-filter-info', options).pipe(
            map((response) => {
                const { headers, body } = response;
                return ResponseUtil.pagination<ShortResponseInterface[]>(headers, body.info.invoices);
            })
        );
    }
}
