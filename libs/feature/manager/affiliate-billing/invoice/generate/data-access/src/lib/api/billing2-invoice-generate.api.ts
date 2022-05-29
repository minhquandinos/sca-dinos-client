import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';

import { Billing2InvoiceGenerateRequestDto } from '../dto/billing2-invoice-generate.dto';
import { InvoiceGeneratePaymentInfoDto } from '../dto/invoice-generate-payment-info.dto';
import {
    InvoiceGenerateApprovedBalanceDto,
    InvoiceGenerateApprovedBalanceQueryParamsDto
} from '../models/invoice-generate-approved-balance.model';
import { InvoiceGeneratePaymentInfoModel } from '../models/invoice-generate-payment-info.model';

@Injectable()
export class Billing2InvoiceGenerateApi {
    constructor(private rest: RestApiService) {}

    store(payload: Billing2InvoiceGenerateRequestDto): Observable<any> {
        const formData = RequestUtil.prepareFormData(payload);

        return this.rest.post('billing-invoices-generate', formData);
    }

    getPaymentInfo(queryParams: InvoiceGeneratePaymentInfoDto): Observable<InvoiceGeneratePaymentInfoModel> {
        const params = RequestUtil.queryParams(queryParams);
        return this.rest.get('billing-invoice-get-payment-method-info', { request: { params } }).pipe(pluck('info', 'payment_method'));
    }

    getApprovedBalance(queryParams: InvoiceGenerateApprovedBalanceQueryParamsDto): Observable<InvoiceGenerateApprovedBalanceDto> {
        return this.rest
            .get<ApiResponse<any>>('billing-invoice-get-approved-balance', {
                request: {
                    params: RequestUtil.queryParams(queryParams)
                }
            })
            .pipe(pluck('info'));
    }
}
