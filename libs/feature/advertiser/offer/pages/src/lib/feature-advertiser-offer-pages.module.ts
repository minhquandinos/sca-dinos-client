import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AdvertiserOfferListNavigationComponent,
    AdvertiserOfferListNavigationComponentModule
} from '@scaleo/feature/advertiser/offer/list/navigation/component';
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
                component: AdvertiserOfferListNavigationComponent,
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
                    import('@scaleo/feature/advertiser/offer/list/page').then((m) => m.AdvertiserOfferListPageModule),
                data: {
                    pagePath: 'all'
                }
            }
        ]
    },
    {
        path: ':id',
        loadChildren: (): Promise<any> => import('@scaleo/feature/advertiser/offer/detail/page').then((m) => m.AdvertiserOfferProfileModule)
    }
];

@NgModule({
    imports: [CommonModule, AdvertiserOfferListNavigationComponentModule, RouterModule.forChild(routes)]
})
export class FeatureAdvertiserOfferPagesModule {}
