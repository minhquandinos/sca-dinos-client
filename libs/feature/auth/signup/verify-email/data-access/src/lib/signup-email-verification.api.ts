import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';

@Injectable()
export class SignupEmailVerificationApi {
    constructor(private rest: RestApiService) {}

    public checkUserToken(token: string): Observable<any> {
        const urlParameters = { token };
        return this.rest.get<any>('verify-email', { urlParameters });
    }
}
