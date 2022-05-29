import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReferralsListModule } from '@scaleo/affiliate/referral/shared/components/list';
import { ReferralLinkModule } from '@scaleo/affiliate/referral/shared/pipes/link';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomPaginationModule, DateVariantModule, FieldTextInfoModule, FiltersModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import {
    UiAlertModule,
    UiButtonLinkModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTableColModule
} from '@scaleo/ui-kit/elements';

import { AffiliateReferralsComponent } from './affiliate-referrals.component';

@NgModule({
    declarations: [AffiliateReferralsComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        CustomPaginationModule,
        SharedModule,
        UiSkeletonModule,
        FiltersModule,
        FindPlatformStatusesModule,
        ReferralsListModule,
        UiAlertModule,
        UiSvgIconModule,
        FieldTextInfoModule,
        PlatformFormatPipeModule,
        UiStatusColorModule,
        DateVariantModule,
        UiTableColModule,
        ReferralLinkModule
    ],
    exports: [AffiliateReferralsComponent]
})
export class AffiliateReferralsModule {}
