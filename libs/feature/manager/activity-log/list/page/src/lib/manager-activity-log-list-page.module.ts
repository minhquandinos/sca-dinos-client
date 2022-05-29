import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerActivityListComponent, ManagerActivityLogListModule } from '@scaleo/feature/manager/activity-log/list/component';

@NgModule({
    imports: [
        CommonModule,
        ManagerActivityLogListModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagerActivityListComponent
            }
        ])
    ]
})
export class ManagerActivityLogListPageModule {}
