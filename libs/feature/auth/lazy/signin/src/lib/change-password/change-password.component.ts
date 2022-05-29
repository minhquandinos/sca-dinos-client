import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { AuthChangePasswordModel, SignInService } from '@scaleo/feature/auth/data-access/signin';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    model!: AuthChangePasswordModel;

    passwordResetToken = '';

    error: string;

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _auth: SignInService,
        private readonly _translateErrorService: TranslateErrorService
    ) {
        this.initModel();
    }

    ngOnInit(): void {
        this.setRouteParams();
    }

    setRouteParams() {
        this._route.params.subscribe((params) => {
            this.passwordResetToken = params['passwordResetToken'];
        });
    }

    initModel() {
        this.model = {
            password: '',
            password_repeat: ''
        };
    }

    async changePasswordByPasswordResetToken() {
        try {
            await this._auth.changePasswordByPasswordResetToken(this.passwordResetToken, this.model);
            this._router.navigate(['/login']);
        } catch (resolveError: unknown) {
            const { error: { message = undefined } = {} } = (resolveError as ResolveErrorModel) || {};
            this.error = this._translateErrorService.translate(message);
        }
    }
}
