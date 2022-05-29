import { Injectable } from '@angular/core';
import { combineLatest, Observable, startWith } from 'rxjs';
import { delay, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { AffiliateOfferSmartLinkListModel } from '../affiliate-offer-smart-link-list.model';
import { AffiliateSmartLinkListApi } from '../api/affiliate-smart-link-list.api';
import { AffiliateSmartLinkListQuery } from './affiliate-smart-link-list.query';
import { AffiliateSmartLinkListStore, AffiliateSmartLinksState } from './affiliate-smart-link-list.store';

@Injectable()
export class AffiliateSmartLinkListService extends BaseEntityService<AffiliateSmartLinksState> {
    constructor(
        private api: AffiliateSmartLinkListApi,
        protected query: AffiliateSmartLinkListQuery,
        protected store: AffiliateSmartLinkListStore
    ) {
        super(store, query);
    }

    index(): Observable<AffiliateOfferSmartLinkListModel[]> {
        return combineLatest([this.query.selectParams$(), this.query.reloading$.pipe(startWith(''))]).pipe(
            delay(200),
            switchMap(([queryParams]) => this.api.index(queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            tap((smartLinks: AffiliateOfferSmartLinkListModel[]) => {
                this.store.set(smartLinks);
                this.store.setLoading(false);
            })
        );
    }
}
