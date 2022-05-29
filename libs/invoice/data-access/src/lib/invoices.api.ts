import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import {
    Billing2InvoiceAttachmentRequestModel,
    Billing2InvoiceUpdateResponseModel,
    InvoicesAmount,
    InvoicesModel,
    InvoicesRequestModel
} from '@scaleo/invoice/common';
import { ConfigTableColumn2Model, getConfigTableColumnsUtil } from '@scaleo/shared/components';
import { fileUtil, rxjsOperatorsUtil, Util } from '@scaleo/utils';

@Injectable({
    providedIn: 'root'
})
export class InvoicesApi {
    constructor(protected rest: RestApiService) {}

    index(queryParams?: InvoicesRequestModel): Observable<ApiResponseWithPagination<InvoicesModel[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<InvoicesModel[]>>('billing-invoices-list', options).pipe(
            map((response) => {
                const { headers, body } = response;
                return ResponseUtil.pagination<InvoicesModel[]>(headers, body.info.invoices);
            }),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    getOption(): Observable<ConfigTableColumn2Model[]> {
        return getConfigTableColumnsUtil(this.rest, 'billing-invoices-options').pipe(
            map((columns) => {
                if (columns.some((elem) => !!elem?.items?.length)) {
                    return columns;
                }
                return Util.listToTree(columns, 'group', 'groupSort', 'items', 'items');
            })
        );
    }

    exportData(queryParams: InvoicesRequestModel): Observable<HttpResponse<ArrayBuffer>> {
        const params = RequestUtil.queryParams(queryParams);
        return fileUtil.exportFile(this.rest, 'billing-invoices-export', { params });
    }

    uploadAttachment(id: number, payload: Billing2InvoiceAttachmentRequestModel): Observable<Billing2InvoiceUpdateResponseModel> {
        const formData: FormData = RequestUtil.prepareFormData(payload);

        return this.rest
            .put<ApiResponse<Billing2InvoiceUpdateResponseModel>>('billing-change-upload-attachment', formData, {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'invoice'));
    }

    getAmount(): Observable<InvoicesAmount> {
        return this.rest.get('billing-invoice-amount').pipe(pluck('info'));
    }
}
