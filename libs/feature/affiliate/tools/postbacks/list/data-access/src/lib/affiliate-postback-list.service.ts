import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { PostbackListService } from '@scaleo/affiliate/postback/list/data-access';
import { RestApiService } from '@scaleo/core/rest-api/service';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { AffiliatePostbackListQuery } from './affiliate-postback-list.query';
import { AffiliatePostbackListState, AffiliatePostbackListStore } from './affiliate-postback-list.store';

@Injectable()
export class AffiliatePostbackListService extends BaseEntityService<AffiliatePostbackListState> {
    constructor(
        protected store: AffiliatePostbackListStore,
        protected query: AffiliatePostbackListQuery,
        private affiliatePostbackService: PostbackListService,
        private readonly rest: RestApiService
    ) {
        super(store, query);
    }

    index(): Observable<any> {
        return objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) => this.affiliatePostbackService.index(queryParams)),
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
