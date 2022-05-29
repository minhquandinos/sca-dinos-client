import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { InvoiceMultiChangeStatusQueryParamsDto, InvoiceMultiDeleteQueryParamsDto } from '@scaleo/invoice/common';
import { InvoicesApi } from '@scaleo/invoice/data-access';

@Injectable()
export class Billing2InvoicesApi extends InvoicesApi {
    constructor(protected rest: RestApiService) {
        super(rest);
    }

    multipleDelete(queryParams: InvoiceMultiDeleteQueryParamsDto): Observable<void> {
        const params = RequestUtil.queryParams(queryParams);
        return this.rest.delete<ApiResponse<void>>('billing-invoice-multiple-delete', { request: { params } }).pipe(
            pluck('info'),
            catchError((error) => throwError(error?.info?.errors))
        );
    }

    multipleChangeStatus(queryParams: InvoiceMultiChangeStatusQueryParamsDto): Observable<void> {
        const params = RequestUtil.queryParams(queryParams);
        return this.rest
            .put<ApiResponse<void>>('billing-invoice-multiple-change-status', null, {
                request: { params }
            })
            .pipe(
                pluck('info'),
                catchError((error) => throwError(error?.info?.errors))
            );
    }
}
