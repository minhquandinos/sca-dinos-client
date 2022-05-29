import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { Billing2LayoutComponent } from '@scaleo/feature/manager/affiliate-billing/common';
import { PermissionsPlansGuard } from '@scaleo/platform/permission/checker/guards';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

interface BillingRouteInterface {
    list: Route;
    page: Route;
}

const affiliateRoute: BillingRouteInterface = {
    list: {
        path: 'affiliates',
        canLoad: [PermissionsPlansGuard],
        canActivate: [PermissionsPlansGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessAffiliateBilling],
                nextPage: '/manager/billing/invoices',
                deniedPage: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate-billing/affiliates/page').then((m) => m.ManagerAffiliateBillingAffiliatesPageModule)
    },
    page: {
        path: 'affiliates/:id',
        canLoad: [NgxPermissionsGuard],
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessAffiliateBilling],
                redirectTo: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate-billing/affiliate/page').then(
                (m) => m.ManagerAffiliateBillingAffiliatePageModuleModule
            )
    }
};

const invoicesRoute: BillingRouteInterface = {
    list: {
        path: 'invoices',
        canLoad: [PermissionsPlansGuard],
        canActivate: [PermissionsPlansGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessAffiliateInvoices],
                deniedPage: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate-billing/invoices/page').then((m) => m.ManagerBillingInvoicesPageModule)
    },
    page: {
        path: 'invoices/:id',
        canLoad: [NgxPermissionsGuard],
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
                only: [PLATFORM_PERMISSIONS.canAccessAffiliateInvoices],
                redirectTo: '/permission-denied'
            }
        },
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/manager/affiliate-billing/invoice/detail/page').then((m) => m.ManagerInvoiceDetailPageModule)
    }
};

const routes: Routes = [
    {
        path: '',
        component: Billing2LayoutComponent,
        data: {
            header: 'main_navigation.affiliate_billing'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'affiliates'
            },
            affiliateRoute.list,
            invoicesRoute.list
        ]
    },
    affiliateRoute.page,
    invoicesRoute.page
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerAffiliateBillingPagesRoutingModule {}
