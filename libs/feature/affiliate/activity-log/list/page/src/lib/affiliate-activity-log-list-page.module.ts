import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AffiliateActivityListComponent, AffiliateActivityLogListModule } from '@scaleo/feature/affiliate/activity-log/list/component';

@NgModule({
    imports: [
        CommonModule,
        AffiliateActivityLogListModule,
        RouterModule.forChild([
            {
                path: '',
                component: AffiliateActivityListComponent
            }
        ])
    ]
})
export class AffiliateActivityLogListPageModule {}
