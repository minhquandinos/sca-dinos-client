import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';

import { AffiliateConfigLayoutComponent } from './layouts/affiliate-config-layout/affiliate-config-layout.component';
import { AffiliateProfileLayoutComponent } from './layouts/affiliate-profile-layout/affiliate-profile-layout.component';
import { ManagerAccessAffiliateDetailResolver } from './manager-access-affiliate-detail.resolver';
import { ManagerAffiliateProfileComponent } from './manager-affiliate-profile.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateProfileLayoutComponent,
        children: [
            {
                path: '',
                component: ManagerAffiliateProfileComponent
            },
            {
                path: '',
                component: AffiliateConfigLayoutComponent,
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                resolve: {
                    detail: ManagerAccessAffiliateDetailResolver
                },
                data: {
                    permissions: {
                        only: [
                            PLATFORM_PERMISSIONS.frontCanAccessAffiliateDetailNestedPages,
                            PLATFORM_PERMISSIONS.canAddEditDeleteDomains,
                            PLATFORM_PERMISSIONS.canSeeReferralReports,
                            PLATFORM_PERMISSIONS.canAddEditDeletePostbacks,
                            PLATFORM_PERMISSIONS.canAccessActivityLog,
                            PLATFORM_PLAN_FEATURE.domains
                        ],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/affiliate/detail/config/pages').then((m) => m.ManagerAffiliateDetailConfigPagesModule)
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ManagerAccessAffiliateDetailResolver]
})
export class ManagerAffiliateDetailPageRoutingModule {}
