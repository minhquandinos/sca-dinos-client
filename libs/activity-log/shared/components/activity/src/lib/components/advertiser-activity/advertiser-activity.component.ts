import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BaseActivityComponent } from '../base-activity.component';

@Component({
    selector: 'scaleo-advertiser-activity',
    templateUrl: '../affiliate-activity/affiliate-activity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertiserActivityComponent extends BaseActivityComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}
