import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ManagerLeadsReceiveListComponentComponent,
    ManagerLeadsReceiveListComponentModule
} from '@scaleo/feature-manager-leads-receive-campaigns-list-component';

@NgModule({
    imports: [
        CommonModule,
        ManagerLeadsReceiveListComponentModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagerLeadsReceiveListComponentComponent
            }
        ])
    ]
})
export class ManagerLeadsReceiveCampaignsPageModule {}
