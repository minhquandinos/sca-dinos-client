import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { ManagerReferralService } from '@scaleo/feature/manager/affiliate/referral/data-access';
import { objectUtil } from '@scaleo/utils';

import { ManagerReferralListQuery } from './manager-referral-list.query';
import { ManagerReferralListState, ManagerReferralListStore } from './manager-referral-list.store';

@Injectable()
export class ManagerReferralListService extends BaseEntityService<ManagerReferralListState> {
    constructor(
        protected store: ManagerReferralListStore,
        protected query: ManagerReferralListQuery,
        private readonly managerReferralService: ManagerReferralService
    ) {
        super(store, query);
    }

    index(affiliateId: number): Observable<any> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) => this.managerReferralService.index(queryParams, affiliateId)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            tap(({ results }) => {
                this.store.set(results);
            }),
            map((results) => results)
        );
        return this.observable(observable);
    }
}
