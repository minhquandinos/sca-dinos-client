import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeliverLeadsEnum } from '@scaleo/feature/manager/leads/deliver/common';
import { ManagerLeadsDeliverNavigationComponent } from '@scaleo/feature/manager/leads/deliver/navigation';
import { ReceiveLeadsLayoutComponent } from '@scaleo/feature/manager/leads/layouts';

const routes: Routes = [
    {
        path: '',
        component: ReceiveLeadsLayoutComponent,
        data: {
            header: 'main_navigation.deliver-leads'
        },
        children: [
            {
                path: '',
                component: ManagerLeadsDeliverNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: DeliverLeadsEnum.Deliveries
            },
            {
                path: DeliverLeadsEnum.Deliveries,
                loadChildren: (): any =>
                    import('@scaleo/feature/manager/leads/deliver/deliveries/page').then((m) => m.ManagerLeadsDeliverDeliveriesPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerLeadsDeliverRoutingModule {}
