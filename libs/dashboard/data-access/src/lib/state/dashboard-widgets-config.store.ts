import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';
import { DashboardWidgetModel } from '@scaleo/dashboard/common';

export interface DashboardConfigState {
    active: DashboardWidgetModel[];
    inactive: DashboardWidgetModel[];
}

const initialState = createBaseInitialState<DashboardConfigState>({
    active: [],
    inactive: []
});

@Injectable()
@StoreConfig({ name: 'dashboard-grid', resettable: true })
export class DashboardWidgetsConfigStore extends BaseStateStore<DashboardConfigState> {
    constructor() {
        super(initialState);
    }
}
