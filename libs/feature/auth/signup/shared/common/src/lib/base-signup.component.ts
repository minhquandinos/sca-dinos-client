import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { ArrayUtil } from '@scaleo/utils';

@Component({ template: '' })
export abstract class BaseSignupComponent {
    public form: FormGroup;

    public allowSignup: boolean;

    public allSignUpFieldsConfig: CustomFieldInterface[];

    public mustAgreePrivacyPolicy: boolean;

    public mustAgreeTermsAndConditions: boolean;

    agreeTermsAndConditionsLink: string;

    privacyPolicyLink: string;

    requiredFieldsIds: number[];

    optionalFieldsIds: number[];

    isLoad: boolean;

    autoApproveNewUsers: boolean;

    haveEmailVerification: boolean;

    error: string;

    protected constructor(
        protected authService: SignInService,
        protected router: Router,
        protected configCustomFieldService: ConfigCustomFieldService,
        protected readonly unsubscribe: UnsubscribeService,
        protected readonly activatedRoute: ActivatedRoute
    ) {}

    protected sharedRegisterUser(form: any): BaseObjectModel {
        // TODO NX AffiliateInterface | AdvertiserListModel
        const { tags, company_name, country, custom_fields } = form;
        const formValue = {
            ...form,
            manager: this.getManagerParam,
            tags: tags ? ArrayUtil.join(tags) : '',
            company_name: company_name || '',
            country: country || 0,
            custom_fields: this.configCustomFieldService.convertCustomFieldsToString(custom_fields)
        };
        if (!formValue.custom_fields) {
            delete formValue.custom_fields;
        }
        return formValue;
    }

    protected navigateToEmailVerificationPage(): void {
        this.router.navigate(['/auth/verify-email']);
    }

    protected get getManagerParam(): string {
        return this.activatedRoute.snapshot.queryParams?.['m'] || '';
    }
}
