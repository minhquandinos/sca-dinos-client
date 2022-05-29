import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvertiserActivityListComponent, AdvertiserActivityLogListModule } from '@scaleo/feature/advertiser/activity-log/list/component';

@NgModule({
    imports: [
        CommonModule,
        AdvertiserActivityLogListModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdvertiserActivityListComponent
            }
        ])
    ]
})
export class AdvertiserActivityLogListPageModule {}
