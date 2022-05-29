import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthModel, BaseAuthServiceInterface } from '@scaleo/auth/data';
import { AuthEventService } from '@scaleo/auth/event/service';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { AuthRemoteApi } from './auth-remote.api';

@Injectable({ providedIn: 'root' })
export class AuthRemoteService implements BaseAuthServiceInterface {
    constructor(
        private readonly api: AuthRemoteApi,
        private route: ActivatedRoute,
        private router: Router,
        private readonly authEventService: AuthEventService,
        private settingsQuery: PlatformSettingsQuery,
        @Inject(DOCUMENT) private document: Document
    ) {}

    async login(token: string): Promise<AuthModel> {
        const login = await this.api.remoteLogin({ auth_token: token }).pipe(this.authEventService.event()).toPromise();
        return login;
    }

    getRealTokenByTempToken(token: string): Observable<string> {
        return this.api.getRealTokenByOneTimeControlToken(token);
    }

    redirectLoginPage(returnUrl?: string): void {
        if (this.settingsQuery?.settings?.login_custom_url) {
            this.document.location.href = this.settingsQuery?.settings?.login_custom_url;
        } else {
            const url = new URL(this.document.location.href);

            const newUrl = new URL('/login', url);
            if (returnUrl && returnUrl !== 'login') {
                newUrl.searchParams.append('returnUrl', returnUrl);
            }
            this.document.location.href = newUrl.href;
        }
    }
}
