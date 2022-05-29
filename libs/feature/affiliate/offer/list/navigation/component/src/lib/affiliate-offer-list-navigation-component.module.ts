import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { UiDividerModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { AffiliateOfferListNavigationComponent } from './affiliate-offer-list-navigation/affiliate-offer-list-navigation.component';

@NgModule({
    declarations: [AffiliateOfferListNavigationComponent],
    imports: [
        CommonModule,
        UiTabNavBarModule,
        PlatformFormatPipeModule,
        RouterModule,
        CustomInfoTooltipModule,
        SharedModule,
        UiDividerModule
    ]
})
export class AffiliateOfferListNavigationComponentModule {}
