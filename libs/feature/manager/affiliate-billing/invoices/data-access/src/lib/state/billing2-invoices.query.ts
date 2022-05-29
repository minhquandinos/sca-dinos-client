import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';
import { InvoicesParamsEnum, InvoicesParamsStateModel, InvoicesQueryInterface, InvoicesRequestModel } from '@scaleo/invoice/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import { Billing2InvoicesState, Billing2InvoicesStore } from './billing2-invoices.store';

@Injectable({ providedIn: 'root' })
export class Billing2InvoicesQuery extends BaseEntityQuery<Billing2InvoicesState> implements InvoicesQueryInterface {
    constructor(protected store: Billing2InvoicesStore) {
        super(store);
    }

    get columns$() {
        return this.selectParamsValue$('columns').pipe(
            map((columns) =>
                columns?.split(',').map((column) => ({
                    value: column,
                    translate: `table.column.${column}`
                }))
            )
        );
    }

    private get prepareParams$(): Observable<InvoicesRequestModel> {
        return objectUtil.mutationKeyWhenValuesChanges(this.selectParams$(), 'page', 1).pipe(
            map((params: InvoicesParamsStateModel) => {
                return {
                    ...params,
                    [InvoicesParamsEnum.Status]: ArrayUtil.join(params[InvoicesParamsEnum.Status]),
                    affiliates: ArrayUtil.join(params[InvoicesParamsEnum.Affiliates]),
                    payments_methods: ArrayUtil.join(params[InvoicesParamsEnum.PaymentsMethods]),
                    currencies: ArrayUtil.join(params[InvoicesParamsEnum.Currencies])
                };
            })
        );
    }

    get updated$(): Observable<InvoicesRequestModel> {
        return this.prepareParams$.pipe(
            debounceTime(200),
            filter(({ columns }) => !!columns),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            map((params) => params)
        );
    }

    get rangeDate$(): Observable<Pick<CustomDateRangeModel, 'rangeTo' | 'rangeFrom'>> {
        return this.selectParams$().pipe(
            map(({ rangeFrom, rangeTo }) => ({
                rangeFrom,
                rangeTo
            }))
        );
    }
}
