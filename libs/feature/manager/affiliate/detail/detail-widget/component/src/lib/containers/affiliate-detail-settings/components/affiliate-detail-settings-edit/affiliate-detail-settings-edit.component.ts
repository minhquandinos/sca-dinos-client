import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_DETAIL_SETTINGS_WIDGET_PROVIDER,
    AffiliateDetailSettingsUpsertModel,
    AffiliateDetailSettingsWidgetService,
    AffiliateDetailWidgetModel
} from '@scaleo/feature/manager/affiliate/detail/detail-widget/data-access';
import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { referralCommissions } from '@scaleo/platform/referral/common';
import { PlatformReferralSettingsService } from '@scaleo/platform/referral/service';
import { ApiAccessStatusEnum } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-affiliate-detail-settings-edit',
    templateUrl: './affiliate-detail-settings-edit.component.html',
    providers: [AFFILIATE_DETAIL_SETTINGS_WIDGET_PROVIDER, UnsubscribeService, PlatformReferralSettingsService]
})
export class AffiliateDetailSettingsEditComponent implements OnInit {
    readonly affiliateData: AffiliateDetailWidgetModel;

    readonly apiLink: string;

    readonly showReferralProgram: boolean;

    readonly showReferralCommission: boolean;

    public form: FormGroup;

    readonly referralCommissionCurrencySymbol = this.platformReferralSettingsService.referralCommissionCurrencySymbol;

    readonly referralCommissions = referralCommissions;

    constructor(
        private readonly fb: FormBuilder,
        private readonly profileQuery: ProfileQuery,
        private readonly platformReferralSettingsService: PlatformReferralSettingsService,
        private readonly affiliateDetailSettingsService: AffiliateDetailSettingsWidgetService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly checkPermissionService: CheckPermissionService
    ) {
        const { affiliateData, apiLink, showReferralProgram, showReferralCommission } = this.modal3EditFormRef.config.data;
        this.affiliateData = affiliateData;
        this.apiLink = apiLink;
        this.showReferralProgram = showReferralProgram;
        this.showReferralCommission = showReferralCommission;
    }

    ngOnInit(): void {
        this.initForm();
        this.setAffiliateData();
    }

    private initForm(): void {
        this.form = this.fb.group({
            api_status: ApiAccessStatusEnum.Off,
            referred_by: undefined,
            referral_commission: [0, Validators.required]
        });

        if (this.checkPermissionService.check(PLATFORM_PERMISSIONS.visibilityAssignedUsers)) {
            this.form.get('referred_by').disable();
            this.form.get('referral_commission').disable();
        }
    }

    private setAffiliateData(): void {
        this.form.patchValue({
            api_status: this.affiliateData.api_status,
            referred_by: this.affiliateData.referred_by || undefined,
            referral_commission: this.affiliateData.referral_commission
        });
    }

    save(): void {
        if (this.form.valid) {
            const { value } = this.form;
            const post: AffiliateDetailSettingsUpsertModel = {
                ...value,
                referred_by: value.referred_by || 0
            };

            this.affiliateDetailSettingsService
                .update(this.affiliateData.id, post)
                .pipe(take(1))
                .subscribe((result) => {
                    this.modal3EditFormRef.close(result, Modal3CloseEventEnum.Update);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
