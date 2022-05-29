import { Injectable } from '@angular/core';
import { combineLatest, Observable, startWith } from 'rxjs';
import { delay, pluck, switchMap, tap } from 'rxjs/operators';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { ManagerSmartLinkListApi } from '../api/manager-smart-link-list.api';
import { ManagerOfferSmartLinkListModel } from '../manager-offer-smart-link-list.model';
import { ManagerSmartLinkListQuery } from './manager-smart-link-list.query';
import { ManagerSmartLinkListStore, ManagerSmartLinksState } from './manager-smart-link-list.store';

@Injectable()
export class ManagerSmartLinkListService extends BaseEntityService<ManagerSmartLinksState> {
    constructor(
        private api: ManagerSmartLinkListApi,
        protected query: ManagerSmartLinkListQuery,
        protected store: ManagerSmartLinkListStore
    ) {
        super(store, query);
    }

    index(): Observable<ManagerOfferSmartLinkListModel[]> {
        return combineLatest([
            objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1),
            this.query.reloading$.pipe(startWith(''))
        ]).pipe(
            delay(200),
            switchMap(([queryParams]) => this.api.index(queryParams)),
            tap(({ pagination }) => {
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            tap((smartLinks: ManagerOfferSmartLinkListModel[]) => {
                this.store.set(smartLinks);
                this.store.setLoading(false);
            })
        );
    }
}
