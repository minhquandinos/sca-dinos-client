import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { AuthInterface, AuthModel, SignUpTwoFAPayloadDto, TwoFAModel } from '@scaleo/auth/data';
import { Auth2faService } from '@scaleo/auth/two-fa-verification/service';
import { BaseObjectModel } from '@scaleo/core/data';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { FetchCustomFieldsService, FieldsInterface } from '@scaleo/shared/data-access/custom-fields';

import { SignupAffiliateApi } from './signup-affiliate.api';

// TODO NX change BaseObjectModel to AffiliateInterface/AffiliateModel
@Injectable({
    providedIn: 'root'
})
export class SignupAffiliateService implements AuthInterface {
    payload: BaseObjectModel;

    constructor(
        protected readonly api: SignupAffiliateApi,
        private readonly router: Router,
        private readonly auth2faService: Auth2faService,
        private readonly authService: SignInService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly fetchCustomFieldsService: FetchCustomFieldsService
    ) {}

    submit(payload: BaseObjectModel): Observable<any> {
        const { email, password } = payload;
        this.payload = payload;

        const { isAffSignupProcessWithoutApproval, isAffSignupProcessEmailVerification, isAffSignupApprovalRequired } =
            this.platformSettingsQuery.settings;

        return this.api.signUp(payload).pipe(
            tap((response: BaseObjectModel | TwoFAModel | any) => {
                if (response?.twoFA_enabled) {
                    this.auth2faService.setConfig2(this);
                    this.router.navigate(['/signup/verification']);
                }
            }),
            filter((response: TwoFAModel) => !response?.twoFA_enabled),
            switchMap(() => {
                if (isAffSignupProcessWithoutApproval) {
                    return this.authService.submit({ email, password });
                }
                if (isAffSignupProcessEmailVerification) {
                    this.router.navigate(['/signup/verify-email']);
                }
                if (isAffSignupApprovalRequired) {
                    this.router.navigate(['/signup/approval-required']);
                }
                return EMPTY;
            })
        );
    }

    submit2FaRestCode(payload: BaseObjectModel): Observable<any> {
        return this.api.signUp(payload);
    }

    submit2Fa({ email, code }: SignUpTwoFAPayloadDto): Observable<AuthModel> {
        const { isAffSignupProcessWithoutApproval, isAffSignupProcessEmailVerification, isAffSignupApprovalRequired } =
            this.platformSettingsQuery.settings;

        return this.api.signUpTwoFA({ email, code }).pipe(
            switchMap(() => {
                if (isAffSignupProcessWithoutApproval) {
                    return this.authService.submit({ email, password: this.payload.password });
                }
                if (isAffSignupProcessEmailVerification) {
                    this.router.navigate(['/signup/verify-email']);
                }
                if (isAffSignupApprovalRequired) {
                    this.router.navigate(['/signup/approval-required']);
                }
                return EMPTY;
            })
        );
    }

    getFields(): Observable<FieldsInterface> {
        return this.fetchCustomFieldsService.fields('affiliate');
    }
}
