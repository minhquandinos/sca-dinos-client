import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerActivityLogListDateRangePlaceEnum,
    ManagerActivityLogListEntityEnum
} from '@scaleo/feature/manager/activity-log/list/data-access';
import { MANAGER_NAVIGATION_PATH } from '@scaleo/feature/manager/core/navigation';
import { PermissionsPlansGuard } from '@scaleo/platform/permission/checker/guards';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';

const subPages = MANAGER_NAVIGATION_PATH.affiliates.subPages;

const routes: Routes = [
    {
        path: subPages.postbacks.routePath,
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate/postback/list/page').then((m) => m.ManagerAffiliatePostbackListPageModule)
    },
    {
        path: subPages.domains.routePath,
        canLoad: [PermissionsPlansGuard],
        canActivate: [PermissionsPlansGuard],
        data: {
            permissions: {
                only: [PLATFORM_PLAN_FEATURE.domains],
                deniedPage: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate/domain/page').then((m) => m.ManagerAffiliateDomainPageModule)
    },
    {
        path: subPages.referrals.routePath,
        canLoad: [NgxPermissionsGuard],
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canSeeReferralReports],
                redirectTo: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate/referral/list/page').then((m) => m.ManagerAffiliateReferralListPageModule)
    },
    {
        path: subPages.activityLog.routePath,
        canLoad: [NgxPermissionsGuard],
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessActivityLog],
                redirectTo: '/permission-denied'
            },
            dataRangePosition: ManagerActivityLogListDateRangePlaceEnum.FilterContainer,
            cardHeaderTitle: 'activity_logs.title',
            listQueryParams: ManagerActivityLogListEntityEnum.Affiliate
        },
        loadChildren: (): any => import('@scaleo/feature/manager/activity-log/list/page').then((m) => m.ManagerActivityLogListPageModule)
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ManagerAffiliateDetailConfigPagesModule {}
