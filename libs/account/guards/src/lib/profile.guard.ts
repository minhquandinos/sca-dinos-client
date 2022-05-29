import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, mapTo, switchMap, tap } from 'rxjs/operators';

import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
import { CredentialsModel } from '@scaleo/auth/data';
import { AuthLogoutService } from '@scaleo/auth/logout/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { NavigateRootService } from '@scaleo/shared/components';

@Injectable({
    providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly profileService: NewProfileService,
        private readonly router: Router,
        private readonly preloadService: PreloadService,
        private readonly authCredentialsService: AuthCredentialsService,
        private readonly authLogoutService: AuthLogoutService,
        private navigateRootService: NavigateRootService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authCredentialsService.credentials$.pipe(
            filter((credentials) => !!credentials),
            switchMap(() => this.check(route, state))
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.check(childRoute, state);
    }

    private check(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authCredentialsService.credentials$.pipe(
            filter((credentials: CredentialsModel) => !!credentials?.accessToken),
            switchMap(() => this.profileQuery.roleIsNotEmpty$),
            tap(() => {
                if (state.url === '/') {
                    this.router.navigate([this.navigateRootService.path('dashboard')]);
                }
            }),
            mapTo(true),
            catchError((error) => throwError(error))
        );
    }

    canLoad(): Observable<boolean> {
        return this.profileQuery.role$.pipe(
            filter((role) => !!role),
            mapTo(true)
        );
    }
}
