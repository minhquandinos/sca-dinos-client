import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { CustomValidators } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Component({
    selector: 'scaleo-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [UnsubscribeService]
})
export class LoginComponent implements OnInit {
    @HostBinding('class') hostClass = 'auth';

    allowSignupAff: boolean;

    allowSignupAdv: boolean;

    activeLoginLink = true;

    error: string;

    public form: FormGroup;

    constructor(
        private readonly _authenticationService: AuthenticationService,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        // TODO refactor this, move call service from template
        private readonly _fb: FormBuilder,
        private readonly _toastr: ToastrBarService,
        private readonly _unsubscribe: UnsubscribeService,
        private readonly _platformSettingsQuery: PlatformSettingsQuery,
        private readonly _authService: SignInService,
        private readonly _translate: TranslateService,
        private readonly _translateErrorService: TranslateErrorService
    ) {}

    ngOnInit(): void {
        this.initForm();
        const { aff_allow_affiliate_signup, adv_allow_advertiser_signup } = this._platformSettingsQuery?.settings || {};
        this.allowSignupAff = aff_allow_affiliate_signup;
        this.allowSignupAdv = adv_allow_advertiser_signup;
        if (!this.allowSignupAff && !this.allowSignupAdv) {
            this.activeLoginLink = false;
        }
    }

    initForm(): void {
        this.form = this._fb.group({
            email: ['', [Validators.required, CustomValidators.email]],
            password: ['', Validators.required]
        });
    }

    routePasswordReset(): void {
        this._router.navigate(['login/password-reset']);
    }

    linkToAuth(roleSignUp: 'affiliate' | 'advertiser'): void {
        this._router.navigate([`/signup/${roleSignUp}`]);
    }

    login(): void {
        this.form.disable();
        this.error = undefined;
        const payload = {
            email: this.form.value.email,
            password: this.form.value.password
        };

        this._authService
            .submit(payload)
            .pipe(take(1), rxjsOperatorsUtil.resolveError())
            .subscribe({
                error: (resolveError: ResolveErrorModel) => {
                    this.form.enable();
                    if (resolveError.code === 401) {
                        this.error = this._translate.instant('server_validation.unavailable_login');
                    } else {
                        this.error = this._translateErrorService.translate(resolveError?.error?.message);
                    }
                }
            });
    }
}
