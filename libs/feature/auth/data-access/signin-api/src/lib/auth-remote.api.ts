import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AuthModel, AuthTypeApiEndpointEnum } from '@scaleo/auth/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';

@Injectable({ providedIn: 'root' })
export class AuthRemoteApi {
    constructor(private readonly http: HttpClient, private env: EnvService, private rest: RestApiService) {}

    remoteLogin(body: { auth_token: string }): Observable<AuthModel> {
        return this.http
            .post<ApiResponse<AuthModel>>(`${this.env.serverUrl}/user/${AuthTypeApiEndpointEnum.RemoteLogin}`, body)
            .pipe(pluck('info'));
    }

    getRealTokenByOneTimeControlToken(token: string): Observable<string> {
        return this.http
            .get<ApiResponse<string>>(`${this.env.serverUrl}/user/get-token`, { params: { temporary_token: token } })
            .pipe(pluck('info', 'token'));
    }
}
