import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerOffersModule } from '@scaleo/feature/manager/offer/list/component';

import { ManagerOfferListPageComponent } from './manager-offer-list-page.component';

@NgModule({
    declarations: [ManagerOfferListPageComponent],
    imports: [
        CommonModule,
        ManagerOffersModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagerOfferListPageComponent
            }
        ])
    ]
})
export class FeatureManagerOfferListPageModule {}
