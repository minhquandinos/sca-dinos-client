import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ActivityLogInterface } from '@scaleo/activity-log/common';

import { ActivityOutputType } from './activity.model';

@Component({
    selector: 'scaleo-activity',
    templateUrl: './activity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent {
    @Input() item: ActivityLogInterface;

    @Input() outputType: ActivityOutputType = 'default';
}
