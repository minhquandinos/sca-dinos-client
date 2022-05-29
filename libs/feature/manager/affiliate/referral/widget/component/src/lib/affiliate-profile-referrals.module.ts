import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateReferralWidgetService } from '@scaleo/feature/manager/affiliate/referral/widget/data-access';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CardWidgetModule, NavigateRootModule } from '@scaleo/shared/components';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { AffiliateProfileReferralsComponent } from './affiliate-profile-referrals.component';

@NgModule({
    declarations: [AffiliateProfileReferralsComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiButtonLinkModule,
        PlatformFormatPipeModule,
        UiSimpleTableModule,
        SharedModule,
        NavigateRootModule,
        NavigateRootModule,
        CardWidgetModule,
        PregMatchPipeModule
    ],
    providers: [ManagerAffiliateReferralWidgetService],
    exports: [AffiliateProfileReferralsComponent]
})
export class AffiliateProfileReferralsModule {}
