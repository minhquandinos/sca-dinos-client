import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AffiliateOffersComponent, AffiliateOffersModule } from '@scaleo/feature/affiliate/offer/list/component';

@NgModule({
    imports: [
        CommonModule,
        AffiliateOffersModule,
        RouterModule.forChild([
            {
                path: '',
                component: AffiliateOffersComponent
            }
        ])
    ]
})
export class AffiliateOfferListPageModule {}
