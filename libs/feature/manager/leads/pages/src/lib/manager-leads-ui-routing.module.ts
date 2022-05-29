import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionsPlansGuard } from '@scaleo/platform/permission/checker/guards';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

import { ManagerLeadsUiLayoutComponent } from './manager-leads-ui-layout.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerLeadsUiLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                canLoad: [PermissionsPlansGuard],
                canActivate: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessLeads],
                        nextPage: '/manager/leads/receive',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/leads/manage/page').then((m) => m.ManagerLeadsManagePageModule)
            },
            {
                path: 'logs',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessLeadsLog],
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/leads/logs/pages').then((m) => m.ManagerLeadsLogsPagesModule)
            },
            {
                path: 'receive',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canManageLeadsCampaignsAndDelivery],
                        nextPage: '/manager/leads/deliver',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/leads/receive/pages').then((m) => m.ManagerLeadsReceivePagesModule)
            },
            {
                path: 'deliver',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canManageLeadsCampaignsAndDelivery],
                        nextPage: '/manager/leads/logs',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/leads/deliver/pages').then((m) => m.ManagerLeadsDeliverPagesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerLeadsUiRoutingModule {}
