import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MANAGER_AFFILIATE_NAVIGATE } from '@scaleo/feature/manager/affiliate/common';
import { ManagerAffiliateAccessPageGuard } from '@scaleo/feature/manager/affiliate/guards';
import { AffiliatesComponent, FeatureManagerAffiliateListComponentModule } from '@scaleo/feature/manager/affiliate/list/component';
import { ManagerAffiliatesNavigationComponent, ManagerAffiliatesNavigationModule } from '@scaleo/feature/manager/affiliate/list/navigation';
import { FeatureSharedCollectionLayoutComponent } from '@scaleo/feature/shared/layouts/collection';

const routes: Routes = [
    {
        path: '',
        component: FeatureSharedCollectionLayoutComponent,
        children: [
            {
                path: '',
                outlet: 'navigation',
                component: ManagerAffiliatesNavigationComponent
            },
            {
                path: '',
                redirectTo: MANAGER_AFFILIATE_NAVIGATE.all,
                pathMatch: 'full'
            },
            {
                path: MANAGER_AFFILIATE_NAVIGATE.all,
                component: AffiliatesComponent,
                canLoad: [ManagerAffiliateAccessPageGuard],
                canActivate: [ManagerAffiliateAccessPageGuard],
                data: {
                    page: MANAGER_AFFILIATE_NAVIGATE.all
                }
            },
            {
                path: MANAGER_AFFILIATE_NAVIGATE.my,
                component: AffiliatesComponent,
                canLoad: [ManagerAffiliateAccessPageGuard],
                canActivate: [ManagerAffiliateAccessPageGuard],
                data: {
                    page: MANAGER_AFFILIATE_NAVIGATE.my
                }
            },
            {
                path: MANAGER_AFFILIATE_NAVIGATE.pending,
                component: AffiliatesComponent,
                canLoad: [ManagerAffiliateAccessPageGuard],
                canActivate: [ManagerAffiliateAccessPageGuard],
                data: {
                    page: MANAGER_AFFILIATE_NAVIGATE.pending
                }
            }
        ]
    }
];

@NgModule({
    imports: [FeatureManagerAffiliateListComponentModule, ManagerAffiliatesNavigationModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerAffiliateListPageRoutingModule {}
