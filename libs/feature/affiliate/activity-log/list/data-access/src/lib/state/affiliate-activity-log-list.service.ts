import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { ActivityLogApi } from '@scaleo/activity-log/data-access';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { AffiliateActivityLogListModel } from '../models/affiliate-activity-log-list.model';
import { AffiliateActivityLogListQuery } from './affiliate-activity-log-list.query';
import { AffiliateActivityLogListStore, AffiliateActivityLogState } from './affiliate-activity-log-list.store';

@Injectable()
export class AffiliateActivityLogListService extends BaseEntityService<AffiliateActivityLogState> {
    constructor(
        private api: ActivityLogApi,
        protected store: AffiliateActivityLogListStore,
        protected query: AffiliateActivityLogListQuery
    ) {
        super(store, query);
    }

    index(): Observable<ActivityLogInterface> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) => this.api.index<ActivityLogInterface, AffiliateActivityLogListModel>(queryParams)),
            tap(({ pagination, results }) => {
                this.store.set(
                    results.map((item: ActivityLogInterface) => ({
                        ...item,
                        id: guid()
                    }))
                );
                this.updateDataValue({ pagination });
            }),
            pluck('results')
        );

        return this.observable(observable);
    }
}
