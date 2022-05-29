import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';

import { BillingAffiliatesModel, BillingAffiliatesParamsStateModel } from '../models/billing-affiliates.model';

export interface BillingAffiliatesState extends BaseEntityState<BillingAffiliatesModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: BillingAffiliatesParamsStateModel;
}

export const initialBillingAffiliateState = (): any =>
    createEntityInitialState<BillingAffiliatesState>({
        data: {
            pagination: undefined
        },
        params: {
            status: '',
            sortField: 'approved_balance',
            sortDirection: 'desc',
            page: 1,
            perPage: 25,
            columns: '',
            search: undefined,
            invoice_frequency: [],
            payment_terms: [],
            payment_methods: []
        }
    });

@Injectable()
@StoreConfig({ name: ManagerStateNameEnum.BillingAffiliates, resettable: true })
export class BillingAffiliatesStore extends BaseEntityStore<BillingAffiliatesState> {
    constructor() {
        super(initialBillingAffiliateState());
    }
}
