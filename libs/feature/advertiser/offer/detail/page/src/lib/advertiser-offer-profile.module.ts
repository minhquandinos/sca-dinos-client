import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AdvertiserAccessOfferDetailInfoWidgetModule } from '@scaleo/feature/advertiser/offer/detail/widgets/info';
import { OfferProfileCreativesModule } from '@scaleo/offer/shared/old-widgets/creative-widget';
import { OfferProfileFinancesModule } from '@scaleo/offer/shared/old-widgets/finance-widget';
import { OfferGoalsCardModule } from '@scaleo/offer/shared/old-widgets/goal-widget';
import { OfferProfileUrlsModule } from '@scaleo/offer/shared/old-widgets/landing-page-widget';
import { OfferProfileShortStatisticsModule } from '@scaleo/offer/shared/old-widgets/short-statistic-widget';
import { OfferProfileTargetingModule } from '@scaleo/offer/shared/old-widgets/targeting-widget';
import { CreativePreviewModule } from '@scaleo/offer-creative-shared-components-preview';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ConversionStatusModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiChipModule, UiSvgIconModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { AdvertiserOfferProfileComponent } from './advertiser-offer-profile.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertiserOfferProfileComponent
    }
];

@NgModule({
    declarations: [AdvertiserOfferProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        OfferProfileTargetingModule,
        OfferGoalsCardModule,
        OfferProfileUrlsModule,
        OfferProfileCreativesModule,
        OfferProfileFinancesModule,
        SharedModule,
        UiButtonLinkModule,
        UiChipModule,
        UiSvgIconModule,
        OfferProfileShortStatisticsModule,
        PlatformFormatPipeModule,
        ConversionStatusModule,
        UiTableModule,
        CreativePreviewModule,
        AdvertiserAccessOfferDetailInfoWidgetModule
    ]
})
export class AdvertiserOfferProfileModule {}
