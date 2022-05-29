import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { ActivityLogApi } from '@scaleo/activity-log/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { objectUtil } from '@scaleo/utils';

import { ManagerActivityLogListModel } from '../models/manager-activity-log-list.model';
import { ManagerActivityLogListQuery } from './manager-activity-log-list.query';
import { ManagerActivityLogListStore, ManagerActivityLogState } from './manager-activity-log-list.store';

@Injectable()
export class ManagerActivityLogListService extends BaseEntityService<ManagerActivityLogState> {
    constructor(private api: ActivityLogApi, protected store: ManagerActivityLogListStore, protected query: ManagerActivityLogListQuery) {
        super(store, query);
    }

    index(entityFilter: BaseObjectModel): Observable<ActivityLogInterface> {
        const observable = objectUtil.mutationKeyWhenValuesChanges(this.query.selectParams$(), 'page', 1).pipe(
            switchMap((queryParams) =>
                this.api.index<ActivityLogInterface, ManagerActivityLogListModel>({ ...queryParams, ...entityFilter })
            ),
            tap(({ pagination, results }) => {
                this.store.set(results);
                this.updateDataValue({ pagination });
            }),
            pluck('results')
        );

        return this.observable(observable);
    }
}
