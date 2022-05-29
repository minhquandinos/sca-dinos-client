import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AuthModel, AuthTypeApiEndpointEnum } from '@scaleo/auth/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';

@Injectable({
    providedIn: 'root'
})
export class AuthWorkspaceApi {
    constructor(private readonly http: HttpClient, private env: EnvService, private rest: RestApiService) {}

    loginBy(body: { auth_token: string }): Observable<AuthModel> {
        return this.http
            .post<ApiResponse<AuthModel>>(`${this.env.serverUrl}/user/${AuthTypeApiEndpointEnum.WorkspaceLogin}`, body)
            .pipe(pluck('info'));
    }

    oneTimeControlToken(workspace: string): Observable<string> {
        return this.http.get<any>('https://scaleo.io/api/workspace-auth', { params: { workspace } }).pipe(pluck('token'));
    }
}
