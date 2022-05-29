import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ResolveErrorModel } from '@scaleo/core/error/common';
import { TranslateErrorService } from '@scaleo/core/error/service';
import { SignInService } from '@scaleo/feature/auth/data-access/signin';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent {
    email = '';

    error: string;

    constructor(
        private readonly _router: Router,
        private readonly _auth: SignInService,
        private readonly _translateErrorService: TranslateErrorService
    ) {}

    async getResetLink() {
        try {
            await this._auth.resetPasswordByEmail(this.email);
            this._router.navigate(['auth/password-reset-confirmation', this.email]);
        } catch (resolveError: unknown) {
            const { error: { message = undefined } = {} } = (resolveError as ResolveErrorModel) || {};
            this.error = this._translateErrorService.translate(message);
        }
    }
}
