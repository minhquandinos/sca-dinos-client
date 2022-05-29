import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignupEmailVerificationApi } from './signup-email-verification.api';

@Injectable()
export class SignupEmailVerificationService {
    constructor(private api: SignupEmailVerificationApi) {}

    checkUserToken(token: string): Observable<any> {
        return this.api.checkUserToken(token);
    }
}
