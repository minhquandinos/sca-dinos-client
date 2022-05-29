import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerOfferListNavigationComponent,
    ManagerOfferListNavigationModule
} from '@scaleo/feature/manager/offer/list/navigation/component';
import { OffersLayoutComponent } from '@scaleo/offer/layouts/list';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

const routes: Routes = [
    {
        path: '',
        component: OffersLayoutComponent,
        data: {
            header: 'main_navigation.offers'
        },
        children: [
            {
                path: '',
                component: ManagerOfferListNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full'
            },
            {
                path: 'all',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/list/page').then((m) => m.FeatureManagerOfferListPageModule),
                data: {
                    pagePath: 'all'
                }
            },
            {
                path: 'featured',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/list/page').then((m) => m.FeatureManagerOfferListPageModule),
                data: {
                    pagePath: 'featured'
                }
            },
            {
                path: 'smart-links',
                loadChildren: (): any =>
                    import('@scaleo/feature/manager/offer/smart-link/list/page').then((m) => m.ManagerOfferSmartLinkListPageModule)
            },
            {
                path: 'requests',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canManageOfferRequests],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/request/list/page').then((m) => m.ManagerOfferRequestListPageModule)
            }
        ]
    },
    {
        path: ':id',
        loadChildren: (): Promise<any> => import('@scaleo/feature/manager/offer/detail/pages').then((m) => m.ManagerOfferDetailPagesModule)
    }
];

@NgModule({
    imports: [CommonModule, ManagerOfferListNavigationModule, RouterModule.forChild(routes)]
})
export class ManagerOfferPagesModule {}
