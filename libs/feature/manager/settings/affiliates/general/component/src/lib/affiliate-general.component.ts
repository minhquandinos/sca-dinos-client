import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    SETTINGS_AFFILIATE_GENERAL_PROVIDE,
    SettingsAffiliateGeneralModel,
    SettingsAffiliateGeneralService
} from '@scaleo/feature/manager/settings/affiliates/general/data-access';
import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { referralCommissions, ReferralCommissionSourceEnum, ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';
import { NewPlatformSettingsService, PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

const FORM_CONTROL = {
    canSeePendingConv: 'general_see_pending_conv',
    generalSeeRejectedConv: 'general_see_rejected_conv',
    generalSeeTrashConv: 'general_see_trash_conv',
    referralProgram: 'referral_program',
    referralCommissionType: 'referral_commission_type',
    referralCommission: 'referral_commission',
    autoApprovePostbacks: 'auto_approve_postbacks',
    referralCommissionSource: 'referral_commission_source',
    referralCommissionCurrency: 'referral_commission_currency'
} as const;

@Component({
    selector: 'scaleo-mng-settings-affiliate-general',
    templateUrl: './affiliate-general.component.html',
    providers: [UnsubscribeService, SETTINGS_AFFILIATE_GENERAL_PROVIDE]
})
export class AffiliateGeneralComponent implements OnInit, OnDestroy {
    @Input() saved: boolean;

    form: FormGroup;

    isLoad: boolean;

    readonly formControl = FORM_CONTROL;

    commissionsTypes: PlatformListsFormatInterface[] = [
        {
            id: ReferralCommissionsTypeEnum.Percentage,
            title: 'referrals_page.commission_types_list.percentage'
        },
        {
            id: ReferralCommissionsTypeEnum.Flat,
            title: 'referrals_page.commission_types_list.flat'
        }
    ];

    commissionSources: PlatformListsFormatInterface[] = [
        {
            id: ReferralCommissionSourceEnum.Revenue,
            title: 'offers_page.profile.finances.revenue'
        },
        {
            id: ReferralCommissionSourceEnum.Payout,
            title: 'offers_page.profile.finances.payout'
        },
        {
            id: ReferralCommissionSourceEnum.Profit,
            title: 'offers_page.profile.finances.profit'
        }
    ];

    commissionTypeEnum = ReferralCommissionsTypeEnum;

    referralCommissions: number[] = referralCommissions;

    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private readonly settingsCardService: SettingsCardService,
        private validation: ValidationMethods,
        private newPlatformSettingsService: NewPlatformSettingsService,
        private toastr: ToastrBarService,
        private readonly settingsAffiliateGeneralService: SettingsAffiliateGeneralService,
        private readonly platformSettingsService: NewPlatformSettingsService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadFormData();

        this.settingsCardService.saveSubject.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.save();
        });

        this.form
            .get('referral_program')
            .valueChanges.pipe(takeUntil(this.unsubscribe))
            .subscribe((value) => {
                if (value) {
                    this.changeReferralProgram(value);
                }
            });

        this.form
            .get('referral_commission_type')
            .valueChanges.pipe(startWith(''), takeUntil(this.unsubscribe))
            .subscribe((type) => {
                if (type) {
                    this.changeCommissionType(type);
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            [FORM_CONTROL.canSeePendingConv]: [BooleanEnum.False],
            [FORM_CONTROL.generalSeeRejectedConv]: [BooleanEnum.False],
            [FORM_CONTROL.generalSeeTrashConv]: [BooleanEnum.False],
            [FORM_CONTROL.referralProgram]: [BooleanEnum.False],
            [FORM_CONTROL.referralCommissionType]: [],
            [FORM_CONTROL.referralCommission]: [],
            [FORM_CONTROL.autoApprovePostbacks]: [BooleanEnum.True],
            [FORM_CONTROL.referralCommissionSource]: [],
            [FORM_CONTROL.referralCommissionCurrency]: ['']
        });
    }

    private loadFormData(): void {
        this.settingsAffiliateGeneralService
            .view()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((general) => {
                this.form.patchValue({
                    ...general,
                    [FORM_CONTROL.autoApprovePostbacks]: BooleanEnum.True
                });
                this.isLoad = true;
            });
    }

    private save(): void {
        if (this.form.valid) {
            const data: SettingsAffiliateGeneralModel = { ...this.form.value };
            this.settingsAffiliateGeneralService
                .update(data)
                .pipe(
                    switchMap(() => this.platformSettingsService.getPlatformSettings()),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.toastr.successes(this.translate.instant('administration_settings.affiliates.general.save_notification'));
                });
        } else {
            this.validation.validateAllFormFields(this.form);
        }
    }

    changeCommissionType(type: any): void {
        if (type === ReferralCommissionsTypeEnum.Percentage) {
            this.form.get(FORM_CONTROL.referralCommissionSource).setValue(ReferralCommissionSourceEnum.Payout);
            this.form.get(FORM_CONTROL.referralCommission).setValue(5);
        } else if (type === ReferralCommissionsTypeEnum.Flat) {
            this.form.get(FORM_CONTROL.referralCommission).setValue('');
            this.form.get(FORM_CONTROL.referralCommission).setValidators(Validators.required);
            this.form.get('referral_commission_currency').setValue(this.platformSettingsQuery.settings.currency);
        } else {
            this.form.get(FORM_CONTROL.referralCommissionSource).clearValidators();
            this.form.get(FORM_CONTROL.referralCommission).clearValidators();
        }
    }

    changeReferralProgram(program: any): void {
        if (program === 1) {
            this.form.get(FORM_CONTROL.referralCommissionType).setValue(ReferralCommissionsTypeEnum.Percentage);
            this.form.get(FORM_CONTROL.referralCommission).setValue(5);
        } else {
            this.form.patchValue({
                [FORM_CONTROL.referralCommissionType]: [''],
                [FORM_CONTROL.referralCommission]: [''],
                [FORM_CONTROL.referralCommissionCurrency]: ['']
            });

            this.form.get(FORM_CONTROL.referralCommissionSource).clearValidators();
            this.form.get(FORM_CONTROL.referralCommission).clearValidators();
        }
    }
}
