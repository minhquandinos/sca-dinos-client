import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TopAffiliatesModule } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/list';
import { TrendsWidgetModule } from '@scaleo/shared/components2/trends-widget';

import { OfferProfileTrendsComponent } from './offer-detail-trends.component';

@NgModule({
    declarations: [OfferProfileTrendsComponent],
    exports: [OfferProfileTrendsComponent],
    imports: [CommonModule, TrendsWidgetModule, TopAffiliatesModule]
})
export class OfferDetailTrendsModule {}
