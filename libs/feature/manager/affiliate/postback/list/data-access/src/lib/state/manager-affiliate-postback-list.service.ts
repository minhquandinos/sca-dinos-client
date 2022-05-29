import { Injectable } from '@angular/core';
import { filter, Observable, pluck, switchMap, tap } from 'rxjs';

import { AffiliatePostbackListModel, PostbackListService } from '@scaleo/affiliate/postback/list/data-access';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { AffiliateDetailQuery } from '@scaleo/feature/manager/affiliate/detail/data-access';

import { ManagerAffiliatePostbackListQuery } from './manager-affiliate-postback-list.query';
import { ManagerAffiliatePostbackListState, ManagerAffiliatePostbackListStore } from './manager-affiliate-postback-list.store';

@Injectable()
export class ManagerAffiliatePostbackListService extends BaseEntityService<ManagerAffiliatePostbackListState> {
    constructor(
        protected store: ManagerAffiliatePostbackListStore,
        protected query: ManagerAffiliatePostbackListQuery,
        private affiliatePostbackService: PostbackListService,
        private readonly affiliateDetailQuery: AffiliateDetailQuery
    ) {
        super(store, query);
    }

    index(): Observable<AffiliatePostbackListModel[]> {
        return this.affiliateDetailQuery.select('id').pipe(
            filter((id) => !!id),
            switchMap((id) =>
                this.query.selectParams$().pipe(switchMap((queryParams) => this.affiliatePostbackService.index(queryParams, id)))
            ),
            tap(({ pagination }) => {
                this.store.update({
                    data: {
                        pagination
                    }
                });
            }),
            pluck('results'),
            tap((results) => {
                this.store.set(results);
                this.store.setLoading(false);
            })
        );
    }
}
