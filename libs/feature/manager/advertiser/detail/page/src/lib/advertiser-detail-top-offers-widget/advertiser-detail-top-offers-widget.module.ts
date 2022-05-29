import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { TopOfferListModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/list';
import { NavigateRootModule } from '@scaleo/shared/components';

import { AdvertiserDetailTopOffersWidgetComponent } from './advertiser-detail-top-offers-widget.component';

@NgModule({
    declarations: [AdvertiserDetailTopOffersWidgetComponent],
    imports: [CommonModule, SharedModule, RouterModule, NavigateRootModule, TopOfferListModule],
    exports: [AdvertiserDetailTopOffersWidgetComponent]
})
export class AdvertiserDetailTopOffersWidgetModule {}
