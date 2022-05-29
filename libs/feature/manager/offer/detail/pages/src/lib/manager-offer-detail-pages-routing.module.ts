import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

import { OfferDetailComponent } from './components/offer-detail-container/offer-detail.component';
import { OfferDetailLayoutComponent } from './layouts/offer-detail-layout.component';
import { OfferDetailResolver } from './resolvers/offer-detail.resolver';

const routes: Routes = [
    {
        path: '',
        component: OfferDetailLayoutComponent,
        resolve: {
            detail: OfferDetailResolver
        },
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessOffers],
                redirectTo: '/permission-denied'
            }
        },
        children: [
            {
                path: '',
                component: OfferDetailComponent
            },
            {
                path: '',
                canLoad: [NgxPermissionsGuard],
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [
                            PLATFORM_PERMISSIONS.canAddEditDeleteOffers,
                            PLATFORM_PERMISSIONS.canManageCustomParameters,
                            PLATFORM_PERMISSIONS.canAccessActivityLog
                        ],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/offer/detail/sub-pages').then((m) => m.ManagerOfferDetailSubPagesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerOfferDetailPagesRoutingModule {}
