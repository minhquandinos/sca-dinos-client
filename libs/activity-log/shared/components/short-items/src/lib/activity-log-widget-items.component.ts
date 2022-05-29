import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ActivityLogInterface } from '@scaleo/activity-log/common';

@Component({
    selector: 'scaleo-activity-log-widget-items',
    templateUrl: './activity-log-widget-items.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogWidgetItemsComponent {
    @Input() items: ActivityLogInterface[] = [];

    @Input() loading: boolean;

    @Input() role: 'default' | 'affiliate' | 'advertiser';
}
