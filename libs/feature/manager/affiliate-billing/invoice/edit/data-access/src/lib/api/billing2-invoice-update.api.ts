import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { Billing2InvoiceUpdateRequestModel, Billing2InvoiceUpdateResponseModel } from '@scaleo/invoice/common';

@Injectable()
export class Billing2InvoiceUpdateApi {
    constructor(private rest: RestApiService) {}

    show(id: number): Observable<Billing2InvoiceUpdateResponseModel> {
        return this.rest
            .get<ApiResponse<Billing2InvoiceUpdateResponseModel>>('billing-invoice-update', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'invoice'));
    }

    update(id: number, payload: Billing2InvoiceUpdateRequestModel): Observable<Billing2InvoiceUpdateResponseModel> {
        const newPayload = cloneDeep(payload);
        if (typeof newPayload.attachment_file === 'string') {
            delete newPayload['attachment_file'];
        }

        const formData: FormData = RequestUtil.prepareFormData(newPayload);

        return this.rest
            .put<ApiResponse<Billing2InvoiceUpdateResponseModel>>('billing-invoice-update', formData, {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'invoice'));
    }

    destroy(id: number): Observable<any> {
        return this.rest.delete('billing-invoice-delete', {
            urlParameters: {
                id
            }
        });
    }

    deleteAttachment(id: number): Observable<unknown> {
        return this.rest.delete('billing-invoice-delete-attachment', {
            urlParameters: {
                id
            }
        });
    }
}
