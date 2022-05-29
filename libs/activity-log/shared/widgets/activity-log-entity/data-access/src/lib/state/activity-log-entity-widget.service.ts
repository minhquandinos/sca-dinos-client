import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, pluck, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ActivityLogInterface, ActivityLogRequestModel } from '@scaleo/activity-log/common';
import { ActivityLogApi } from '@scaleo/activity-log/data-access';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { ActivityLogEntityWidgetQuery } from './activity-log-entity-widget.query';
import { ActivityLogEntityWidgetState, ActivityLogEntityWidgetStore } from './activity-log-entity-widget.store';

@Injectable()
export class ActivityLogEntityWidgetService extends BaseEntityService<ActivityLogEntityWidgetState> {
    readonly totalCount$ = new BehaviorSubject<number>(0);

    constructor(
        protected store: ActivityLogEntityWidgetStore,
        protected query: ActivityLogEntityWidgetQuery,
        private readonly translateService: TranslateService,
        private readonly activityLogService: ActivityLogApi
    ) {
        super(store, query);
    }

    index(params: ActivityLogRequestModel): Observable<ActivityLogInterface[]> {
        this.updateParamsValue({
            ...params
        });
        const observable = this.query.selectParams$().pipe(
            switchMap((queryParams) => this.activityLogService.index(queryParams)),
            tap(({ pagination, results }) => {
                this.updateDataValue({ pagination });
                this.store.set(results);
            }),
            pluck('results')
        );

        return this.observable(observable);
    }
}
