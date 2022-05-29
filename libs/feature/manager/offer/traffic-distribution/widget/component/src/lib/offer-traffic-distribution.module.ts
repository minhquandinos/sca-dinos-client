import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CardWidgetModule, CustomInfoTooltipModule, DayPresetsModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { ShortEntityListModule } from '@scaleo/shared/data-access/short-entity-list';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferDistributionAbTestingModule } from './containers/offer-distribution-ab-testing/offer-distribution-ab-testing.module';
import { OfferTrafficDistributionComponent } from './offer-traffic-distribution.component';

@NgModule({
    declarations: [OfferTrafficDistributionComponent],
    imports: [
        CommonModule,
        OfferDistributionAbTestingModule,
        CardWidgetModule,
        DayPresetsModule,
        UiButtonLinkModule,
        SelectModule,
        SharedModule,
        UiSvgIconModule,
        CustomInfoTooltipModule,
        FindPlatformListModule,
        ShortEntityListModule
    ],
    exports: [OfferTrafficDistributionComponent]
})
export class OfferTrafficDistributionModule {}
