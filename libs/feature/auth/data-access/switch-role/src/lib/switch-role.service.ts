import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NewProfileService } from '@scaleo/account/data-access';
import { AuthAsService } from '@scaleo/auth/as/service';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { AuthModel } from '@scaleo/auth/data';
import { PreloadService } from '@scaleo/core/preload/service';
import { SnackBarService, ToastrBarService } from '@scaleo/ui-kit/elements';

import { SwitchRoleApi } from './switch-role.api';

@Injectable({ providedIn: 'root' })
export class SwitchRoleService {
    constructor(
        private readonly api: SwitchRoleApi,
        private readonly router: Router,
        private readonly preloadService: PreloadService,
        private readonly snackBarService: SnackBarService,
        private readonly profileService: NewProfileService,
        private readonly toastr: ToastrBarService,
        private readonly credentialsService: AuthCredentialsService,
        private readonly authAsService: AuthAsService
    ) {}

    login(): Observable<string> {
        this.preloadService.setLoaded(false);
        this.snackBarService.closeAll();
        this.profileService.reset();
        return this.authAsService.email$.pipe(
            switchMap((email) =>
                this.api.loginAs(email).pipe(
                    tap((auth: AuthModel) => {
                        if (auth) {
                            this.credentialsService.set(auth.credentials);
                        }
                    }),
                    catchError((err) => {
                        this.preloadService.setLoaded(true);
                        this.toastr.exception('response_message.login_as_exception');
                        return throwError(err);
                    })
                )
            ),
            switchMap(() => this.profileService.get()),
            filter((profile) => !!profile.role),
            map(() => undefined)
        );
    }
}
