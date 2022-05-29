import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { UiButtonLinkModule, UiPageWrapperModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { OfferProfileShortStatisticsComponent } from './offer-profile-short-statistics.component';

@NgModule({
    declarations: [OfferProfileShortStatisticsComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        UiTableModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        RouterModule,
        PlatformFormatPipeModule
    ],
    exports: [OfferProfileShortStatisticsComponent]
})
export class OfferProfileShortStatisticsModule {}
