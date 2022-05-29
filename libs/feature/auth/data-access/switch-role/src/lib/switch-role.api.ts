import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AuthModel } from '@scaleo/auth/data';
import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

@Injectable({
    providedIn: 'root'
})
export class SwitchRoleApi {
    constructor(private rest: RestApiService) {}

    loginAs(email: string): Observable<AuthModel> {
        return this.rest.post<ApiResponse<AuthModel>>('user-login-as', { email }).pipe(pluck('info'));
    }
}
