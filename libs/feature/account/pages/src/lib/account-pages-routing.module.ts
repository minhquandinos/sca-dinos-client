import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { ProfileGuard } from '@scaleo/account/guards';
import { BASE_ROLE } from '@scaleo/platform/role/models';

import { AccountShellComponent } from './account-shell/account-shell.component';

const routes: Routes = [
    {
        path: '',
        component: AccountShellComponent,
        canActivate: [ProfileGuard],
        children: [
            {
                path: 'manager',
                canActivate: [NgxPermissionsGuard],
                canLoad: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [BASE_ROLE.admin, BASE_ROLE.manager, BASE_ROLE.affiliateManager, BASE_ROLE.advertiserManager],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> => import('@scaleo/feature/manager/pages').then((m) => m.ManagerPagesModule)
            },
            {
                path: 'affiliate',
                canActivate: [NgxPermissionsGuard],
                canLoad: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [BASE_ROLE.affiliate],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> => import('@scaleo/feature/affiliate/pages').then((m) => m.AffiliatePagesModule)
            },
            {
                path: 'advertiser',
                canActivate: [NgxPermissionsGuard],
                canLoad: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [BASE_ROLE.advertiser],
                        redirectTo: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> => import('@scaleo/feature/advertiser/pages').then((m) => m.AdvertiserAccessPagesModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountPagesRoutingModule {}
