import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CountryFlagModule, CustomInfoModule, ShortListColumnModule } from '@scaleo/shared/components';
import { UiImageModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AllowedTagsModule } from '../../../../../../shared/components/src/lib/allowed-tags/allowed-tags.module';
import { OfferTargetingDefaultComponent } from './components/offer-targeting-default/offer-targeting-default.component';
import { OfferTargetingGeoComponent } from './components/offer-targeting-geo/offer-targeting-geo.component';
import { OfferTargetingItemComponent } from './components/offer-targeting-item/offer-targeting-item.component';
import { OfferTargetingItemShowDotDirective } from './components/offer-targeting-item/offer-targeting-item-show-dot.directive';
import { OfferTargetingListComponent } from './offer-targeting-list.component';
import { OfferTargetingJoinPipe } from './pipes/offer-targeting-join.pipe';

@NgModule({
    declarations: [
        OfferTargetingListComponent,
        OfferTargetingDefaultComponent,
        OfferTargetingGeoComponent,
        OfferTargetingItemComponent,
        OfferTargetingJoinPipe,
        OfferTargetingItemShowDotDirective
    ],
    exports: [OfferTargetingListComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiSvgIconModule,
        CustomInfoModule,
        AllowedTagsModule,
        UiImageModule,
        ShortListColumnModule,
        CountryFlagModule
    ]
})
export class OfferTargetingListModule {}
