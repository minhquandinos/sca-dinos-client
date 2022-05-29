import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BaseActivityComponent } from '../base-activity.component';

@Component({
    selector: 'scaleo-affiliate-activity',
    templateUrl: './affiliate-activity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateActivityComponent extends BaseActivityComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}
