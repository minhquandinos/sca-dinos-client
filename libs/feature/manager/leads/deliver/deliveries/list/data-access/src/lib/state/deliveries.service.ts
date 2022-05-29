import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ArrayUtil } from '@scaleo/utils';

import { DeliveriesApi } from '../api/deliveries.api';
import { LeadsDeliveriesModel, LeadsDeliveriesQueryParamsDto, LeadsDeliveriesQueryParamsModel } from '../models/leads-deliveries.model';
import { DeliveriesQuery } from './deliveries.query';
import { DeliveriesStore, LeadsDeliveriesState } from './deliveries.store';

@Injectable()
export class DeliveriesService extends BaseEntityService<LeadsDeliveriesState> {
    constructor(private api: DeliveriesApi, protected override query: DeliveriesQuery, protected override store: DeliveriesStore) {
        super(store, query);
    }

    index(): Observable<LeadsDeliveriesModel[]> {
        const observable = this.query.selectParams$().pipe(
            delay(200),
            switchMap((params) => {
                const newParams = DeliveriesService.convertQueryParams(params);
                return this.api.index(newParams);
            }),
            tap(({ pagination }) => {
                this.updateDataValue({
                    pagination
                });
            }),
            pluck('results'),
            tap((deliveries: LeadsDeliveriesModel[]) => {
                this.store.set(deliveries);
                this.store.setLoading(false);
            })
        );
        return this.observable(observable);
    }

    private static convertQueryParams(queryParams: LeadsDeliveriesQueryParamsModel): LeadsDeliveriesQueryParamsDto {
        return {
            ...queryParams,
            campaigns: ArrayUtil.join(queryParams.campaigns)
        };
    }
}
