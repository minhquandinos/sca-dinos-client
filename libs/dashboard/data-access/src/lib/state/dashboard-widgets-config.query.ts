import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseStateQuery } from '@scaleo/core/state/state';
import { DashboardWidgetModel } from '@scaleo/dashboard/common';

import { DashboardConfigState, DashboardWidgetsConfigStore } from './dashboard-widgets-config.store';

@Injectable()
export class DashboardWidgetsConfigQuery extends BaseStateQuery<DashboardConfigState> {
    constructor(protected override store: DashboardWidgetsConfigStore) {
        super(store);
    }

    get activeWidgets$(): Observable<DashboardWidgetModel[]> {
        return this.select('active');
    }

    get inactiveWidgets$(): Observable<DashboardWidgetModel[]> {
        return this.select('inactive');
    }
}
