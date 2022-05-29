import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateBillingBalanceModel } from '../models/affiliate-billing-balance.model';

@Injectable()
export class AffiliateBillingBalanceApi {
    constructor(private rest: RestApiService) {}

    public show(id: number): Observable<AffiliateBillingBalanceModel> {
        const urlParameters = { id };
        return this.rest
            .get<AffiliateBillingBalanceModel>('affiliate-billing-balance', { urlParameters })
            .pipe(pluck('info', 'billing-affiliate-balance'));
    }
}
