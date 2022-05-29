import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { InvoiceUpdateAmountRequestModel, InvoiceUpdateAmountResponseModel } from '@scaleo/invoice/common';
import { InvoiceApi } from '@scaleo/invoice/data-access';

@Injectable()
export class Billing2InvoiceDetailApi extends InvoiceApi {
    constructor(protected rest: RestApiService) {
        super(rest);
    }

    updateAmount(id: number, payload: InvoiceUpdateAmountRequestModel): Observable<InvoiceUpdateAmountResponseModel> {
        return this.rest.put('billing-change-amount', payload, { urlParameters: { id } }).pipe(pluck('info', 'invoice'));
    }
}
