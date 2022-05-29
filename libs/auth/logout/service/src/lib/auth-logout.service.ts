import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { firstValueFrom } from 'rxjs';

import { NewProfileService } from '@scaleo/account/data-access';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { AuthLogoutApi } from './auth-logout.api';

@Injectable({ providedIn: 'root' })
export class AuthLogoutService {
    constructor(
        private readonly preloadService: PreloadService,
        private readonly credentialsService: AuthCredentialsService,
        private ngxRolesService: NgxRolesService,
        private settingsQuery: PlatformSettingsQuery,
        @Inject(DOCUMENT) private document: Document,
        private readonly api: AuthLogoutApi,
        private readonly profileService: NewProfileService
    ) {}

    async logout(): Promise<void> {
        try {
            await firstValueFrom(this.api.logout());
            this.finishUserSession();
        } catch (e) {
            this.finishUserSession();
            console.log(e);
        }
    }

    finishUserSession(returnUrl?: string): void {
        this.preloadService.setLoaded(false);
        this.clearLocalStorageKeysExpectProtected();
        this.credentialsService.clear();
        this.profileService.reset();
        this.ngxRolesService.flushRoles();
        this.redirect(returnUrl);
    }

    redirect(returnUrl?: string): void {
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

    // TODO delete method after refactor functional with save to localstorage
    private clearLocalStorageKeysExpectProtected(): void {
        const lengthLocalStorageKey = localStorage.length;
        for (let i = 0; i <= lengthLocalStorageKey; ) {
            const keyItem = localStorage.key(i);
            if (keyItem && !/scaleo__/.test(keyItem)) {
                localStorage.removeItem(keyItem);
            } else {
                i += 1;
            }
        }
    }
}
