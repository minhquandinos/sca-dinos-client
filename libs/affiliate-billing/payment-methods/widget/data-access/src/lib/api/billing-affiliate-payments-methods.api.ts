import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';

import { SendPaymentRequestResponseDto } from '../../../../list/src/lib/components/request-payment-modal/models/request-payment-modal.model';
import {
    AffiliateBillingPayloadParamsDto,
    AffiliateBillingPaymentsMethodDetailDto
} from '../models/billing-affiliate-payments-method.model';

@Injectable()
export class BillingAffiliatePaymentsMethodsApi {
    constructor(private readonly rest: RestApiService) {}

    index(id: number): Observable<AffiliateBillingPaymentsMethodDetailDto[]> {
        const options: RestApiOptions = {
            urlParameters: { id }
        };
        return this.rest
            .get<AffiliateBillingPaymentsMethodDetailDto[]>('billing-affiliates-payments-methods', options)
            .pipe(pluck('info', 'affiliates-payments-methods'));
    }

    sendPaymentRequest(payloadParams: AffiliateBillingPayloadParamsDto): Observable<SendPaymentRequestResponseDto> {
        const newPayloadParams = RequestUtil.prepareFormData(payloadParams);
        return this.rest.put<ApiResponse<SendPaymentRequestResponseDto>>('billing-invoice-send-payment-request', newPayloadParams).pipe(
            pluck('info'),
            map((response) => ({
                ...response,
                amount: payloadParams.amount
            }))
        );
    }
}
