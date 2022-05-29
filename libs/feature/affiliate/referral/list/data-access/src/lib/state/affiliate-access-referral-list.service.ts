import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { AffiliateAccessReferralModel } from '../affiliate-access-referral.model';
import { AffiliateAccessReferralListApi } from '../api/affiliate-access-referral-list.api';
import { AffiliateAccessReferralListQuery } from './affiliate-access-referral-list.query';
import { AffiliateAccessReferralListState, AffiliateAccessReferralListStore } from './affiliate-access-referral-list.store';

@Injectable()
export class AffiliateAccessReferralListService extends BaseEntityService<AffiliateAccessReferralListState> {
    constructor(
        protected store: AffiliateAccessReferralListStore,
        protected query: AffiliateAccessReferralListQuery,
        private readonly api: AffiliateAccessReferralListApi
    ) {
        super(store, query);
    }

    index(): Observable<AffiliateAccessReferralModel[]> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) => this.api.index(queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            tap(({ results }) => {
                this.store.set(results);
            }),
            map(({ results }) => results)
        );
        return this.observable(observable);
    }
}
