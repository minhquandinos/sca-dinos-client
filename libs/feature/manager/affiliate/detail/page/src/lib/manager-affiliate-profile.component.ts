import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailQuery, AffiliateDetailService } from '@scaleo/feature/manager/affiliate/detail/data-access';
import { AffiliateDetailWidgetModel } from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'app-affiliate-profile',
    templateUrl: './manager-affiliate-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, PlatformReferralSettingsService]
})
export class ManagerAffiliateProfileComponent {
    readonly id$ = this.affiliateDetailQuery.select('id');

    readonly allowReferralProgram = this.platformReferralSettingsService.referralProgram;

    constructor(
        private router: Router,
        private affiliateDetailService: AffiliateDetailService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType
    ) {}

    setCompanyName({ company_name }: AffiliateDetailWidgetModel) {
        this.affiliateDetailService.updateStore({
            company: company_name
        });
    }
}
