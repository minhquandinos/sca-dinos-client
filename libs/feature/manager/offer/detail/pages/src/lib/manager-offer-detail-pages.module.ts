import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { ActivityLogEntityDetailWidgetModule } from '@scaleo/activity-log/shared/widgets/activity-log-entity/component';
import { SharedModule } from '@scaleo/core/shared/module';
import { OfferAffiliateAccessModule } from '@scaleo/feature/manager/offer/affiliate-access/widget/component';
import { OfferCreativesWidgetModule } from '@scaleo/feature/manager/offer/creative/widget/component';
import { OfferCustomParamsWidgetModule } from '@scaleo/feature/manager/offer/custom-param/widget/component';
import { OfferDetailWidgetModule } from '@scaleo/feature/manager/offer/detail/widget/component';
import { OfferGoalsWidgetModule } from '@scaleo/feature/manager/offer/goal/widget/component';
import { OfferLandingPageWidgetModule } from '@scaleo/feature/manager/offer/landing-page/widget/component';
import { OfferTargetingModule } from '@scaleo/feature/manager/offer/targeting/widget/component';
import { OfferTrafficDistributionModule } from '@scaleo/feature/manager/offer/traffic-distribution/widget/component';
import { OfferDetailTrendsModule } from '@scaleo/feature/manager/offer/trend/widget/component';
import { DetailInfoWidgetModule } from '@scaleo/shared/components';
import { StickyModule } from '@scaleo/shared/directives';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import { DetailInfoModule, UiDividerModule } from '@scaleo/ui-kit/elements';

import { OfferDetailComponent } from './components/offer-detail-container/offer-detail.component';
import { OfferDetailLayoutComponent } from './layouts/offer-detail-layout.component';
import { ManagerOfferDetailPagesRoutingModule } from './manager-offer-detail-pages-routing.module';
import { OfferDetailResolver } from './resolvers/offer-detail.resolver';

@NgModule({
    declarations: [OfferDetailLayoutComponent, OfferDetailComponent],
    imports: [
        CommonModule,
        ManagerOfferDetailPagesRoutingModule,
        FlexModule,
        StickyModule,
        CustomFlexModule,
        OfferDetailWidgetModule,
        OfferGoalsWidgetModule,
        OfferAffiliateAccessModule,
        DetailInfoWidgetModule,
        DetailInfoModule,
        UiDividerModule,
        OfferTargetingModule,
        OfferTrafficDistributionModule,
        OfferCreativesWidgetModule,
        OfferLandingPageWidgetModule,
        ActivityLogEntityDetailWidgetModule,
        SharedModule,
        OfferCustomParamsWidgetModule,
        OfferDetailTrendsModule
    ],
    providers: [OfferDetailResolver]
})
export class ManagerOfferDetailPagesModule {}
