import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReferralsListModule } from '@scaleo/affiliate/referral/shared/components/list';
import { ReferralLinkModule } from '@scaleo/affiliate/referral/shared/pipes/link';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomPaginationModule, DateVariantModule, FieldTextInfoModule, FiltersModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { Filter2Service } from '@scaleo/shared/services/filters';
import {
    UiAlertModule,
    UiButtonLinkModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTableColModule
} from '@scaleo/ui-kit/elements';

import { ManagerAffiliateReferralsComponent } from './manager-affiliate-referrals.component';

@NgModule({
    declarations: [ManagerAffiliateReferralsComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        CustomPaginationModule,
        SharedModule,
        UiSkeletonModule,
        FiltersModule,
        ReferralsListModule,
        UiAlertModule,
        UiSvgIconModule,
        FieldTextInfoModule,
        PlatformFormatPipeModule,
        UiStatusColorModule,
        DateVariantModule,
        UiTableColModule,
        ReferralLinkModule,
        PregMatchPipeModule,
        FindPlatformStatusesModule
    ],
    exports: [ManagerAffiliateReferralsComponent]
})
export class ManagerAffiliateReferralsModule {}
