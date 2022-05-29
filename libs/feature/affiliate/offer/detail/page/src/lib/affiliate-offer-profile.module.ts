import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AffiliateAccessOfferDetailInfoWidgetModule } from '@scaleo/feature/affiliate/offer/detail/widgets/info';
import { AffiliateOfferProfilePostbacksModule } from '@scaleo/feature/affiliate/tools/postbacks/widget/component';
import { ManagerAffiliatePostbackWidgetModule } from '@scaleo/feature/manager/affiliate/postback/widget';
import { OfferProfileCreativesModule } from '@scaleo/offer/shared/old-widgets/creative-widget';
import { OfferProfileFinancesModule } from '@scaleo/offer/shared/old-widgets/finance-widget';
import { OfferGoalsCardModule } from '@scaleo/offer/shared/old-widgets/goal-widget';
import { OfferProfileUrlsModule } from '@scaleo/offer/shared/old-widgets/landing-page-widget';
import { OfferProfileShortStatisticsModule } from '@scaleo/offer/shared/old-widgets/short-statistic-widget';
import { OfferProfileTargetingModule } from '@scaleo/offer/shared/old-widgets/targeting-widget';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ConversionStatusModule, TextareaModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateOfferProfileComponent } from './affiliate-offer-profile.component';
import { OfferProfileCustomUrlModule } from './components/offer-profile-custom-url/offer-profile-custom-url.module';
import { OfferProfileQuickLinksModule } from './components/offer-profile-quick-links/offer-profile-quick-links.module';
import { OfferProfileTrackingModule } from './components/offer-profile-tracking/offer-profile-tracking.module';

const routes: Routes = [
    {
        path: '',
        component: AffiliateOfferProfileComponent
    }
];

@NgModule({
    declarations: [AffiliateOfferProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        UiPageWrapperModule,
        OfferProfileTrackingModule,
        OfferProfileFinancesModule,
        OfferProfileTargetingModule,
        OfferGoalsCardModule,
        OfferProfileShortStatisticsModule,
        OfferProfileCreativesModule,
        AffiliateOfferProfilePostbacksModule,
        OfferProfileUrlsModule,
        ManagerAffiliatePostbackWidgetModule,
        UiButtonLinkModule,
        UiChipModule,
        UiSvgIconModule,
        PlatformFormatPipeModule,
        ConversionStatusModule,
        OfferProfileQuickLinksModule,
        OfferProfileCustomUrlModule,
        TextareaModule,
        AffiliateAccessOfferDetailInfoWidgetModule
    ]
})
export class AffiliateOfferProfileModule {}
