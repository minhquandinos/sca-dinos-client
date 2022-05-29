import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityState, StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { InvoicesModel, InvoicesParamsEnum, InvoicesParamsStateModel } from '@scaleo/invoice/common';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

export interface Billing2InvoicesState extends EntityState<InvoicesModel> {
    data?: {
        pagination: ApiPaginationModel;
        selectedFilters: {
            [key: string]: unknown;
        };
    };
    params?: InvoicesParamsStateModel;
}

export const initialBilling2InvoicesState = (date: CustomDateRangeService, route: ActivatedRoute) => {
    const { rangeFrom, rangeTo } = date.rangeDate(CustomDateRangeTitleEnum.Last30Days);
    const { queryParams } = route.snapshot;
    return createEntityInitialState<Billing2InvoicesState>({
        data: {
            pagination: null,
            selectedFilters: null
        },
        params: {
            columns: '',
            page: 1,
            perPage: 25,
            rangeFrom,
            rangeTo,
            [InvoicesParamsEnum.Status]: [],
            sortField: 'date',
            sortDirection: 'desc',
            [InvoicesParamsEnum.Affiliates]: queryParams?.[InvoicesParamsEnum.Affiliates]
                ? [+queryParams?.[InvoicesParamsEnum.Affiliates]]
                : [],
            [InvoicesParamsEnum.PaymentsMethods]: [],
            [InvoicesParamsEnum.Currencies]: []
        }
    });
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: ManagerStateNameEnum.Billing2Invoices, resettable: true })
export class Billing2InvoicesStore extends BaseEntityStore<Billing2InvoicesState> {
    constructor(private dateRangeService: CustomDateRangeService, private readonly route: ActivatedRoute) {
        super(initialBilling2InvoicesState(dateRangeService, route));
    }
}
