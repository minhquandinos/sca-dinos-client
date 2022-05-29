import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { StickyModule } from '@scaleo/shared/directives';
import { SidenavModule } from '@scaleo/ui-kit/elements';

import { ManagerOutboundLayoutComponent } from './manager-outbound-layout.component';

const routes: Routes = [
    {
        path: '',
        data: {
            header: 'main_navigation.outbound'
        },
        component: ManagerOutboundLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'announcements'
            },
            {
                path: 'announcements',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessAnnouncements],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/outbound/announcements/list/page').then((m) => m.ManagerAnnouncementsListPageModule)
            }
        ]
    }
];

@NgModule({
    declarations: [ManagerOutboundLayoutComponent],
    imports: [CommonModule, RouterModule.forChild(routes), RouterModule, SidenavModule, FlexModule, StickyModule]
})
export class ManagerOutboundModule {}
