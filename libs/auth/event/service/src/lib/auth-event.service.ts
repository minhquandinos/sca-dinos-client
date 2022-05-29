import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, pipe, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { AuthModel } from '@scaleo/auth/data';
import { PreloadService } from '@scaleo/core/preload/service';
import { InitPermissionService } from '@scaleo/platform/permission/role';
import { BASE_ROLE } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { TrialStatusService } from '@scaleo/trial-service';

@Injectable({
    providedIn: 'root'
})
export class AuthEventService {
    private _returnUrl: string;

    private _auth$: BehaviorSubject<AuthModel> = new BehaviorSubject<AuthModel>(undefined);

    constructor(
        // TODO nx fix after refactor report
        // private reportsClearTempFiltersService: ReportsClearTempFiltersService,
        private newProfileService: NewProfileService,
        private readonly preloadService: PreloadService,
        private readonly credentialsService: AuthCredentialsService,
        private readonly authenticationService: AuthenticationService,
        private readonly profileQuery: ProfileQuery,
        private readonly trialStatusService: TrialStatusService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly permissionService: InitPermissionService
    ) {
        this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    event(): any {
        return pipe(
            tap((auth: AuthModel) => {
                if (auth) {
                    this._auth$.next(auth);
                    this.credentialsService.set(auth.credentials);
                    this.preloadService.setLoaded(true);
                }
            }),
            switchMap(() =>
                this.newProfileService.get().pipe(
                    tap(() => {
                        this.permissionService.setPermissions();
                    }),
                    catchError((error) => {
                        this.router.navigate(['/logout']);
                        return throwError(error);
                    })
                )
            ),
            tap(() => {
                const { show_getting_started: showGettingStarted } = this.platformSettingsQuery?.settings || {};

                if (this.authenticationService.isAuthenticated()) {
                    if (showGettingStarted && this.profileQuery.baseRole === BASE_ROLE.admin && this.trialStatusService.getTrial) {
                        this._returnUrl = '/manager/getting-started';
                    } else {
                        this.router.navigate([this._returnUrl]);
                    }
                }
            }),
            catchError((err) => {
                this.preloadService.setLoaded(true);
                return throwError(err);
            })
        );
    }
}
