import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ActivityLogEntityWidgetState, ActivityLogEntityWidgetStore } from './activity-log-entity-widget.store';

@Injectable()
export class ActivityLogEntityWidgetQuery extends BaseEntityQuery<ActivityLogEntityWidgetState> {
    constructor(protected store: ActivityLogEntityWidgetStore) {
        super(store);
    }
}
