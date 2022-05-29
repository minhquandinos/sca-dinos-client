import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AuthModel, AuthPayloadDto, AuthTwoFAPayloadDto, SignUpTwoFAPayloadDto } from '@scaleo/auth/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { AuthChangePasswordModel } from './auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthApi {
    constructor(private readonly _http: HttpClient, private readonly _rest: RestApiService) {}

    baseLogin(body: AuthPayloadDto | { auth_token: string }): Observable<AuthModel> {
        return this._rest.post<ApiResponse<AuthModel>>('login', body).pipe(pluck('info'));
    }

    loginBy(body: { auth_token: string }): Observable<AuthModel> {
        return this._rest.post<ApiResponse<AuthModel>>('loginBy', body).pipe(pluck('info'));
    }

    // remoteLogin(body: { auth_token: string }): Observable<AuthModel> {
    //     return this.http
    //         .post<ApiResponse<AuthModel>>(`${this.env.serverUrl}/user/${AuthTypeApiEndpointEnum.RemoteLogin}`, body)
    //         .pipe(pluck('info'));
    // }

    twoFALogin(body: SignUpTwoFAPayloadDto | AuthTwoFAPayloadDto): Observable<AuthModel> {
        return this._rest.post<ApiResponse<AuthModel>>('loginTwoFa', body).pipe(pluck('info'));
    }

    // loginAs(email: string): Observable<AuthModel> {
    //     return this.rest.post<ApiResponse<AuthModel>>('user-login-as', { email }).pipe(pluck('info'));
    // }

    // logout(): Observable<void> {
    //     return this.http.post<any>(`${this.env.serverUrl}/user/logout`, null);
    // }

    // getRealTokenByOneTimeControlToken(token: string): Observable<string> {
    //     return this.http
    //         .get<ApiResponse<string>>(`${this.env.serverUrl}/user/get-token?`, { params: { temporary_token: token } })
    //         .pipe(pluck('info', 'token'));
    // }

    oneTimeControlToken(workspace: string): Observable<string> {
        return this._http.get<any>('https://scaleo.io/api/workspace-auth', { params: { workspace } }).pipe(pluck('token'));
    }

    resetPasswordByEmail(email: string): Observable<any> {
        return this._rest.post<any>('passwordReset', { email });
    }

    validatePasswordResetTokenByEmail(email: string): Observable<any> {
        return this._rest.post<any>('passwordResetCheck', { email });
    }

    changePasswordByPasswordResetToken(passwordResetToken: string, data: AuthChangePasswordModel): Observable<any> {
        return this._rest.post<any>('passwordChange', data, {
            urlParameters: {
                passwordResetToken
            }
        });
    }
}
