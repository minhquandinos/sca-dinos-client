import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, mapTo, switchMap, take, tap } from 'rxjs/operators';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { CredentialsModel } from '@scaleo/auth/data';
import { AuthLogoutService } from '@scaleo/auth/logout/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { InitPermissionService } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

// import { ReportsClearTempFiltersService } from '../modules/reports/shared/services/reports-clear-temp-filters.service';

@Injectable({
    providedIn: 'root'
})
export class AccountResolver implements Resolve<boolean> {
    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly permissionService: InitPermissionService,
        private readonly nxg: NgxPermissionsService,
        private readonly profileService: NewProfileService,
        // private readonly reportsClearTempFiltersService: ReportsClearTempFiltersService,
        private readonly router: Router,
        private readonly preloadService: PreloadService,
        private readonly authCredentialsService: AuthCredentialsService,
        private readonly authLogoutService: AuthLogoutService,
        private navigateRootService: NavigateRootService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.get().pipe(
            tap(() => {
                this.preloadService.setLoaded(true);
                if (state.url === '/') {
                    this.router.navigate([this.navigateRootService.path('dashboard')]);
                }
            })
        );
    }

    private get(): Observable<boolean> {
        return this.authCredentialsService.credentials$.pipe(
            filter((credentials: CredentialsModel) => !!credentials?.accessToken),
            switchMap(() => {
                if (this.profileQuery.role) {
                    return this.profileQuery.profile$;
                }
                return this.profileService.get().pipe(
                    tap(() => {
                        this.permissionService.setPermissions();
                    }),
                    catchError((error) => {
                        this.authLogoutService.finishUserSession();
                        return throwError(error);
                    })
                );
            }),
            take(1),
            mapTo(true),
            catchError((error) => throwError(error))
        );
    }
}
