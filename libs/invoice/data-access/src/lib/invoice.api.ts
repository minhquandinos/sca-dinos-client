import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { Billing2InvoiceDetailResponseModel } from '@scaleo/invoice/common';

@Injectable({
    providedIn: 'root'
})
export class InvoiceApi {
    constructor(protected rest: RestApiService) {}

    show(id: number): Observable<Billing2InvoiceDetailResponseModel> {
        return this.rest
            .get<ApiResponse<Billing2InvoiceDetailResponseModel>>('billing-invoice', {
                urlParameters: {
                    id
                }
            })
            .pipe(pluck('info', 'invoice'));
    }
}
