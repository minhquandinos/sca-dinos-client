import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { AuthCredentialsService } from '@scaleo/auth/credentials/service';
// import { AuthLogoutService } from '@scaleo/auth/logout/service';
// import { NavigateRootService } from '@scaleo/shared/components';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private authenticationService: AuthenticationService,
        // private authLogoutService: AuthLogoutService,
        // private navigateRootService: NavigateRootService,
        private authCredentialsService: AuthCredentialsService,
        private readonly router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.check();
    }

    canActivateChild(): Observable<boolean> {
        return this.check();
    }

    private check(): Observable<boolean> {
        return this.authCredentialsService.credentials$.pipe(
            tap((credentials) => {
                if (!credentials) {
                    this.router.navigate(['/logout']);
                    // TODO fixed state.url returned /not-found
                    // this.authLogoutService.finishUserSession();
                }
            }),
            mapTo(true),
            catchError((error) => throwError(error))
        );
    }

    canLoad(): Observable<boolean> {
        return this.check();
    }
}
