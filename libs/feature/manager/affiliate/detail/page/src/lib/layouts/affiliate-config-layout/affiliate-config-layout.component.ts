import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateDetailCountsService, AffiliateDetailQuery } from '@scaleo/feature/manager/affiliate/detail/data-access';
import { MANAGER_ENTITY_DETAIL_TOKEN } from '@scaleo/feature/manager/common/entity-detail';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'app-affiliate-config-layout',
    templateUrl: './affiliate-config-layout.component.html',
    providers: [
        PlatformReferralSettingsService,
        UnsubscribeService,
        {
            provide: MANAGER_ENTITY_DETAIL_TOKEN,
            useFactory: (route: ActivatedRoute) => {
                return route?.parent?.parent?.snapshot?.params?.id;
            },
            deps: [ActivatedRoute]
        }
    ]
})
export class AffiliateConfigLayoutComponent implements OnInit {
    readonly affiliateCounts$ = this.affiliateDetailQuery.select('counts');

    readonly affiliateId = this.affiliateDetailQuery.getValue()?.id;

    readonly showReferralProgram: boolean = this.platformReferralSettingsService.referralProgram;

    constructor(
        private readonly affiliateDetailQuery: AffiliateDetailQuery,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        private readonly affiliateDetailCountsService: AffiliateDetailCountsService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType
    ) {}

    ngOnInit(): void {
        this.affiliateDetailCountsService.counts().pipe(takeUntil(this.unsubscribe)).subscribe();
    }
}
