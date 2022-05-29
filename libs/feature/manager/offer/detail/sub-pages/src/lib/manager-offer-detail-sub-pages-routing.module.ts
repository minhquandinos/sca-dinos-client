import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerActivityLogListDateRangePlaceEnum,
    ManagerActivityLogListEntityEnum
} from '@scaleo/feature/manager/activity-log/list/data-access';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

import { OfferConfigLayoutComponent } from './layouts/offer-config-layout/offer-config-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'goals',
        pathMatch: 'full'
    },
    {
        path: '',
        component: OfferConfigLayoutComponent,
        children: [
            {
                path: 'goals',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAddEditDeleteOffers],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/goal/list/page').then((m) => m.ManagerOfferGoalListPageModule)
            },
            {
                path: 'urls',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAddEditDeleteOffers],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/landing-page/list/page').then((m) => m.ManagerOfferLandingPageListPageModule)
            },
            {
                path: 'creatives',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAddEditDeleteOffers],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/creative/list/page').then((m) => m.ManagerOfferCreativeListPageModule)
            },
            {
                path: 'activity-log',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessActivityLog],
                        redirectTo: '/permission-denied'
                    },
                    dataRangePosition: ManagerActivityLogListDateRangePlaceEnum.FilterContainer,
                    cardHeaderTitle: 'activity_logs.title',
                    listQueryParams: ManagerActivityLogListEntityEnum.Offer
                },
                loadChildren: (): any =>
                    import('@scaleo/feature/manager/activity-log/list/page').then((m) => m.ManagerActivityLogListPageModule)
            },
            {
                path: 'custom-params',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canManageCustomParameters],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/custom-param/list/page').then((m) => m.ManagerOfferCustomParamListPageModule)
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerOfferDetailSubPagesRoutingModule {}
