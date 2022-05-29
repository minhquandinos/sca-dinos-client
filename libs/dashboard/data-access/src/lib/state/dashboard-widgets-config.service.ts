import { Injectable } from '@angular/core';
import { debounceTime, Observable, tap } from 'rxjs';

import { BaseStateService } from '@scaleo/core/state/state';
import { DashboardWidgetModel } from '@scaleo/dashboard/common';

import { DashboardWidgetsConfigApi } from '../api/dashboard-widgets-config.api';
import { DashboardWidgetsConfigQuery } from './dashboard-widgets-config.query';
import { DashboardConfigState, DashboardWidgetsConfigStore } from './dashboard-widgets-config.store';

@Injectable()
export class DashboardWidgetsConfigService extends BaseStateService<DashboardConfigState> {
    constructor(
        private readonly api: DashboardWidgetsConfigApi,
        protected override store: DashboardWidgetsConfigStore,
        protected override query: DashboardWidgetsConfigQuery
    ) {
        super(store, query);
    }

    config(): Observable<DashboardWidgetModel[]> {
        const observable = this.api.config().pipe(
            debounceTime(0),
            tap((config) => {
                this.update({
                    active: config
                });
            })
        );

        return this.observable(observable);
    }
}
