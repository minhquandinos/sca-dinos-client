import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { SignUpTwoFAPayloadDto, TwoFAModel, TwoFaResendCodePayloadModel } from '@scaleo/auth/data';
import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';

@Injectable({
    providedIn: 'root'
})
export class SignupAffiliateApi {
    private url = `${this.env.serverUrl}`;

    constructor(private readonly http: HttpClient, private readonly env: EnvService) {}

    signUp(model: BaseObjectModel | TwoFaResendCodePayloadModel): Observable<BaseObjectModel | TwoFAModel> {
        return this.http.post<any>(`${this.url}/signup/affiliate`, model).pipe(pluck('info'));
    }

    signUpTwoFA(payload: SignUpTwoFAPayloadDto): Observable<any> {
        return this.http.post<ApiResponse<BaseObjectModel>>(`${this.url}/users-two-fa/signup`, payload).pipe(pluck('info'));
    }
}
