import { Provider } from '@angular/core';

import { ActivityLogEntityWidgetQuery } from './state/activity-log-entity-widget.query';
import { ActivityLogEntityWidgetService } from './state/activity-log-entity-widget.service';
import { ActivityLogEntityWidgetStore } from './state/activity-log-entity-widget.store';

export const ACTIVITY_LOG_ENTITY_WIDGET_PROVIDER: Provider[] = [
    ActivityLogEntityWidgetStore,
    ActivityLogEntityWidgetService,
    ActivityLogEntityWidgetQuery
];
