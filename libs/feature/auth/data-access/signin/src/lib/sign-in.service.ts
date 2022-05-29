import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { AuthInterface, AuthModel, AuthPayloadDto, AuthTwoFAPayloadDto } from '@scaleo/auth/data';
import { AuthEventService } from '@scaleo/auth/event/service';
import { Auth2faService } from '@scaleo/auth/two-fa-verification/service';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import { AuthApi } from './auth.api';
import { AuthChangePasswordModel } from './auth.model';

@Injectable({ providedIn: 'root' })
export class SignInService implements AuthInterface {
    payload: AuthPayloadDto;

    constructor(
        private readonly _api: AuthApi,
        private readonly _router: Router,
        private readonly _authEventService: AuthEventService,
        private readonly _auth2faService: Auth2faService
    ) {}

    submit(payload: AuthPayloadDto): Observable<AuthModel> {
        this.payload = payload;
        return this._api.baseLogin(payload).pipe(
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tap(({ twoFA_enabled = undefined }) => {
                if (twoFA_enabled) {
                    this._auth2faService.setConfig2(this);
                    this._router.navigate(['/login/verification']);
                }
            }),
            filter(({ credentials = undefined }) => !!credentials),
            this._authEventService.event()
        );
    }

    submit2Fa(payload: AuthTwoFAPayloadDto): Observable<AuthModel> {
        return this._api.twoFALogin(payload).pipe(this._authEventService.event());
    }

    submit2FaRestCode(payload: AuthPayloadDto): Observable<AuthModel> {
        return this._api.baseLogin(payload);
    }

    resetPasswordByEmail(email: string): Promise<any> {
        return firstValueFrom(this._api.resetPasswordByEmail(email).pipe(rxjsOperatorsUtil.resolveError()));
    }

    validatePasswordResetTokenByEmail(email: string): Promise<any> {
        return firstValueFrom(this._api.validatePasswordResetTokenByEmail(email));
    }

    changePasswordByPasswordResetToken(passwordResetToken: string, data: AuthChangePasswordModel): Promise<any> {
        return firstValueFrom(
            this._api.changePasswordByPasswordResetToken(passwordResetToken, data).pipe(rxjsOperatorsUtil.resolveError())
        );
    }
}
