import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ArrayUtil } from '@scaleo/utils';

import { Billing2InvoiceGenerateApi } from '../api/billing2-invoice-generate.api';
import { INVOICE_GENERATE_AFFILIATE_ALL } from '../constants/invoice-generate.const';
import { Billing2InvoiceGenerateRequestDto } from '../dto/billing2-invoice-generate.dto';
import { InvoiceGeneratePaymentInfoDto } from '../dto/invoice-generate-payment-info.dto';
import { Billing2InvoiceGenerateResponseModel } from '../models/billing2-invoice-generate.model';
import {
    InvoiceGenerateApprovedBalanceModel,
    InvoiceGenerateApprovedBalanceQueryParamsDto
} from '../models/invoice-generate-approved-balance.model';
import { InvoiceGeneratePaymentInfoModel } from '../models/invoice-generate-payment-info.model';

@Injectable()
export class Billing2InvoiceGenerateService {
    constructor(private api: Billing2InvoiceGenerateApi) {}

    private static currencyRequest(allAffiliates: boolean, currency: string): string {
        if (allAffiliates) {
            return Array.isArray(currency) ? ArrayUtil?.join(currency) : '';
        }
        return currency;
    }

    private static paymentMethods(allAffiliates: boolean, methods: unknown): string {
        if (allAffiliates) {
            return Array.isArray(methods) ? ArrayUtil.join(methods) : '';
        }
        return '';
    }

    store(payload: Billing2InvoiceGenerateRequestDto): Promise<Billing2InvoiceGenerateResponseModel> {
        return firstValueFrom(
            this.api
                .store({
                    ...payload,
                    affiliate_id: payload.affiliate_id.toString(),
                    currency: Billing2InvoiceGenerateService.currencyRequest(
                        +payload.affiliate_id === INVOICE_GENERATE_AFFILIATE_ALL,
                        payload.currency
                    ),
                    payment_methods: Billing2InvoiceGenerateService.paymentMethods(
                        +payload.affiliate_id === INVOICE_GENERATE_AFFILIATE_ALL,
                        payload.payment_methods
                    )
                })
                .pipe(pluck('info'))
        );
    }

    getPaymentInfo(queryParams: InvoiceGeneratePaymentInfoDto): Observable<InvoiceGeneratePaymentInfoModel> {
        return this.api.getPaymentInfo(queryParams);
    }

    getApprovedBalance(queryParams: InvoiceGenerateApprovedBalanceQueryParamsDto): Observable<InvoiceGenerateApprovedBalanceModel> {
        return this.api.getApprovedBalance(queryParams).pipe(
            map(({ approved_balance: balance }) => ({
                balance,
                currency: queryParams.currency
            }))
        );
    }
}
