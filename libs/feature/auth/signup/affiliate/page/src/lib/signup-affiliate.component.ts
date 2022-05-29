import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';
import { SignupAffiliateService } from '@scaleo/feature/auth/signup/affiliate/data-access';
import { BaseSignupComponent } from '@scaleo/feature/auth/signup/shared/common';
import { AuthSharedSignupComponent } from '@scaleo/feature/auth/signup/shared/components/signup';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { rxjsOperatorsUtil } from '@scaleo/utils';

// TODO NX change BaseObjectModel to AffiliateInterface/AffiliateModel
enum FieldsEnums {
    Contacts = 23
}

@Component({
    selector: 'auth-signup-affiliate',
    templateUrl: './signup-affiliate.component.html',
    providers: [ConfigCustomFieldService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'aff_custom_fields' }, UnsubscribeService]
})
export class SignupAffiliateComponent extends BaseSignupComponent implements OnInit {
    public cont = FieldsEnums.Contacts;

    private _referredBy: number;

    isLoading: boolean;

    @ViewChild(AuthSharedSignupComponent, { static: false })
    private readonly _sharedSign: AuthSharedSignupComponent;

    constructor(
        protected configCustomFieldService: ConfigCustomFieldService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected authService: SignInService,
        protected readonly unsubscribe: UnsubscribeService,
        private readonly _fb: FormBuilder,
        private readonly _platformSettingsQuery: PlatformSettingsQuery,
        private readonly _signupAffiliateService: SignupAffiliateService,
        private readonly _translateErrorService: TranslateErrorService
    ) {
        super(authService, router, configCustomFieldService, unsubscribe, activatedRoute);
    }

    ngOnInit(): void {
        this._initForm();

        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { ref = undefined, ref_id = undefined } = params || {};
            if (ref || ref_id) {
                this._referredBy = ref || ref_id;
            }
        });

        const { isAffSignupProcessWithoutApproval, isAffSignupProcessEmailVerification } = this._platformSettingsQuery.settings;

        this._platformSettingsQuery.settings$
            .pipe(
                switchMap((settings) => {
                    this.allowSignup = +settings.aff_allow_affiliate_signup === 1;
                    this.requiredFieldsIds = settings.aff_required_fields;
                    this.optionalFieldsIds = settings.aff_optional_fields;

                    // TODO quick fix, delete after
                    this._deletePaymentDetailsFromFields();

                    if (this.optionalFieldsIds.length > 0) {
                        this.optionalFieldsIds.sort((a, b) => a - b);
                    }
                    this.mustAgreePrivacyPolicy = settings.aff_must_agree_with_privacy_policy;
                    this.mustAgreeTermsAndConditions = settings.aff_must_agree_with_terms_and_conditions;
                    this.privacyPolicyLink = settings.privacy_policy_url;
                    this.agreeTermsAndConditionsLink = settings.terms_and_conditions_url;
                    this.autoApproveNewUsers = isAffSignupProcessWithoutApproval;
                    this.haveEmailVerification = isAffSignupProcessEmailVerification;

                    return this._signupAffiliateService.getFields();
                }),
                take(1)
            )
            .subscribe((fields) => {
                this.isLoad = true;
                this.allSignUpFieldsConfig = fields['standard-fields'];
            });
    }

    signUp(form: BaseObjectModel): void {
        this.isLoading = true;
        const post: BaseObjectModel = this.sharedRegisterUser(form);
        if (post.traffic_types) {
            post.traffic_types = form.traffic_types.join(',');
        }
        if (this._referredBy) {
            post.referred_by = +this._referredBy;
        }
        const signUp$ = this._signupAffiliateService.submit(post);

        const { isAffSignupApprovalRequired } = this._platformSettingsQuery.settings;

        signUp$
            .pipe(
                tap(() => {
                    if (isAffSignupApprovalRequired) {
                        this.navigateToEmailVerificationPage();
                    }
                }),
                rxjsOperatorsUtil.resolveError(),
                take(1)
            )
            .subscribe({
                error: (resolveError: ResolveErrorModel) => {
                    this.isLoading = false;
                    if (/has already been taken/.test(resolveError.error.message)) {
                        this._sharedSign.setErrorEmail();
                    } else {
                        this.error = this._translateErrorService.translate(resolveError.error.message);
                    }
                }
            });
    }

    public get customFieldsConfig(): CustomFieldInterface[] {
        return this.configCustomFieldService.customFieldsConfig;
    }

    private _initForm(): void {
        this.form = this._fb.group({});
    }

    // TODO quick fix, delete after
    private _deletePaymentDetailsFromFields(): void {
        const paymentDetailsId = 16;
        if (this.requiredFieldsIds.includes(16)) {
            this.requiredFieldsIds = this._deletePaymentDetailsFromArr(this.requiredFieldsIds, paymentDetailsId);
        }

        if (this.requiredFieldsIds.includes(16)) {
            this.optionalFieldsIds = this._deletePaymentDetailsFromArr(this.optionalFieldsIds, paymentDetailsId);
        }
    }

    // TODO quick fix, delete after
    private _deletePaymentDetailsFromArr(items: number[], value: number): number[] {
        if (this.requiredFieldsIds.includes(value)) {
            return items.filter((item) => item !== value);
        }

        return items;
    }
}
