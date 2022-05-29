import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeatureManagerLeadsLayoutsModule, ReceiveLeadsLayoutComponent } from '@scaleo/feature/manager/leads/layouts';
import { ManagerLeadsReceiveNavigationComponent } from '@scaleo/feature/manager/leads/receive/navigation';
import { ReceiveLeadsEnum } from '@scaleo/feature-manager-leads-receive-campaigns-list-data-access';

const routes: Routes = [
    {
        path: '',
        component: ReceiveLeadsLayoutComponent,
        data: {
            header: 'main_navigation.receive-leads'
        },
        children: [
            {
                path: '',
                component: ManagerLeadsReceiveNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: ReceiveLeadsEnum.Campaigns
            },
            {
                path: ReceiveLeadsEnum.Campaigns,
                data: {
                    receiveLeadsPath: ReceiveLeadsEnum.Campaigns
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/leads/receive/campaigns/page').then((m) => m.ManagerLeadsReceiveCampaignsPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FeatureManagerLeadsLayoutsModule],
    exports: [RouterModule]
})
export class ManagerLeadsReceiveRoutingModule {}
