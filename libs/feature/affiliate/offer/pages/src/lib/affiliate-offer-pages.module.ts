import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AffiliateOfferListNavigationComponent,
    AffiliateOfferListNavigationComponentModule
} from '@scaleo/feature/affiliate/offer/list/navigation/component';
import { AffiliateOfferSmartLinkListGuard } from '@scaleo/feature/affiliate/offer/smart-link/list/guards';
import { OffersLayoutComponent } from '@scaleo/offer/layouts/list';

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
                component: AffiliateOfferListNavigationComponent,
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
                    import('@scaleo/feature/affiliate/offer/list/page').then((m) => m.AffiliateOfferListPageModule),
                data: {
                    pagePath: 'all'
                }
            },
            {
                path: 'featured',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/offer/list/page').then((m) => m.AffiliateOfferListPageModule),
                data: {
                    pagePath: 'featured'
                }
            },
            {
                path: 'my',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/offer/list/page').then((m) => m.AffiliateOfferListPageModule),
                data: {
                    pagePath: 'my'
                }
            },
            {
                path: 'smart-links',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/offer/smart-link/list/page').then((m) => m.AffiliateOfferSmartLinkListPageModule),
                canActivate: [AffiliateOfferSmartLinkListGuard]
            }
        ]
    },
    {
        path: ':id',
        loadChildren: (): Promise<any> => import('@scaleo/feature/affiliate/offer/detail/page').then((m) => m.AffiliateOfferProfileModule)
    }
];

@NgModule({
    imports: [CommonModule, AffiliateOfferListNavigationComponentModule, RouterModule.forChild(routes)],
    providers: [AffiliateOfferSmartLinkListGuard]
})
export class AffiliateOfferPagesModule {}
