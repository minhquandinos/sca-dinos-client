import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ActivityLogInterface } from '@scaleo/activity-log/common';

@Component({
    selector: 'app-activity-log-user',
    templateUrl: './activity-log-user.component.html'
})
export class ActivityLogUserComponent {
    @Input() item: ActivityLogInterface | any;

    constructor(private router: Router, private profileQuery: ProfileQuery) {}

    navigate() {
        if (this.item.user.role === 'affiliate' || this.item.user.role === 'advertiser') {
            let url = `${this.profileQuery.slug}`;
            if (this.item.user.role === 'affiliate') {
                url += '/affiliates/';
            } else {
                url += '/advertisers/';
            }
            url += this.item.user.id;
            this.router.navigate([url]);
        }
    }
}
