import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseStateService } from '@scaleo/core/state/state';

import { AffiliateBillingBalanceApi } from '../api/affiliate-billing-balance.api';
import { AffiliateBillingBalanceModel } from '../models/affiliate-billing-balance.model';
import { AffiliateBillingBalanceQuery } from './affiliate-billing-balance.query';
import { AffiliateBillingBalanceStore } from './affiliate-billing-balance.store';

@Injectable()
export class AffiliateBillingBalanceService extends BaseStateService<AffiliateBillingBalanceModel> {
    constructor(
        private readonly api: AffiliateBillingBalanceApi,
        private readonly jsonConvertService: JsonConvertService,
        protected store: AffiliateBillingBalanceStore,
        protected query: AffiliateBillingBalanceQuery
    ) {
        super(store, query);
    }

    public show(affiliateId: number): Observable<AffiliateBillingBalanceModel> {
        return this.observable(this.api.show(affiliateId)).pipe(
            tap((billing: AffiliateBillingBalanceModel) => {
                const mapper = this.jsonConvertService.mapper(AffiliateBillingBalanceModel, billing);
                this.store.update({ ...mapper });
            })
        );
    }
}
