import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';
import { SignupAdvertiserService } from '@scaleo/feature/auth/signup/advertiser/data-access';
import { BaseSignupComponent } from '@scaleo/feature/auth/signup/shared/common';
import { AuthSharedSignupComponent } from '@scaleo/feature/auth/signup/shared/components/signup';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { rxjsOperatorsUtil } from '@scaleo/utils';

enum FieldsEnums {
    Contacts = 33
}

@Component({
    selector: 'auth-signup-advertiser',
    templateUrl: './signup-advertiser.component.html',
    providers: [ConfigCustomFieldService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'adv_custom_fields' }, UnsubscribeService]
})
export class SignupAdvertiserComponent extends BaseSignupComponent implements OnInit {
    public cont = FieldsEnums.Contacts;

    isLoading: boolean;

    @ViewChild(AuthSharedSignupComponent, { static: false })
    private readonly _sharedSign: AuthSharedSignupComponent;

    constructor(
        protected configCustomFieldService: ConfigCustomFieldService,
        protected router: Router,
        protected authService: SignInService,
        protected readonly signupAdvertiserService: SignupAdvertiserService,
        protected readonly unsubscribe: UnsubscribeService,
        protected readonly activatedRoute: ActivatedRoute,
        private _fb: FormBuilder,
        private _platformSettingsQuery: PlatformSettingsQuery,
        private readonly _translateErrorService: TranslateErrorService
    ) {
        super(authService, router, configCustomFieldService, unsubscribe, activatedRoute);
    }

    ngOnInit(): void {
        this._initForm();

        const { isAdvSignupProcessWithoutApproval, isAdvSignupProcessEmailVerification } = this._platformSettingsQuery.settings;

        this._platformSettingsQuery.settings$
            .pipe(
                switchMap((settings) => {
                    this.allowSignup = settings.adv_allow_advertiser_signup;
                    this.requiredFieldsIds = settings.adv_required_fields;
                    this.optionalFieldsIds = settings.adv_optional_fields;
                    if (this.optionalFieldsIds.length > 0) {
                        this.optionalFieldsIds.sort((a, b) => a - b);
                    }
                    this.mustAgreePrivacyPolicy = settings.adv_must_agree_with_privacy_policy;
                    this.mustAgreeTermsAndConditions = settings.adv_must_agree_with_terms_and_conditions;
                    this.privacyPolicyLink = settings.privacy_policy_url;
                    this.agreeTermsAndConditionsLink = settings.terms_and_conditions_url;
                    this.autoApproveNewUsers = isAdvSignupProcessWithoutApproval;
                    this.haveEmailVerification = isAdvSignupProcessEmailVerification;

                    return this.signupAdvertiserService.getFields();
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
        const signUp$ = this.signupAdvertiserService.submit(post);

        const { isAdvSignupApprovalRequired } = this._platformSettingsQuery.settings;

        signUp$
            .pipe(
                tap(() => {
                    if (isAdvSignupApprovalRequired) {
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

    get customFieldsConfig(): CustomFieldInterface[] {
        return this.configCustomFieldService.customFieldsConfig;
    }

    private _initForm(): void {
        this.form = this._fb.group({});
    }
}
