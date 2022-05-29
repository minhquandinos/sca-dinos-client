import { Injectable } from '@angular/core';

import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { CredentialsModel } from '@scaleo/auth/data';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private readonly credentialsService: AuthCredentialsService) {}

    get userCredentials(): CredentialsModel {
        return this.credentialsService.credentials;
    }

    isAuthenticated(): boolean {
        return !!this.userCredentials;
    }

    get isAuthenticatedFromParentRole(): boolean {
        return this.credentialsService.hasParentCredentials;
    }
}
