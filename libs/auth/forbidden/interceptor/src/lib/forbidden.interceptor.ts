import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { AuthLogoutService } from '@scaleo/auth/logout/service';
import { ApiErrorModel } from '@scaleo/core/rest-api/service';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
    constructor(private readonly authenticationService: AuthenticationService, private readonly authLogoutService: AuthLogoutService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ApiErrorModel>> {
        return next?.handle(request).pipe(
            catchError(({ status, error }) => {
                if ([401].includes(status) && this.authenticationService.isAuthenticated()) {
                    if (isDevMode() && confirm('Finish user session and redirect to login page?')) {
                        this.authLogoutService.finishUserSession();
                    }

                    if (!isDevMode()) {
                        this.authLogoutService.finishUserSession();
                    }
                }

                return throwError(error);
            })
        );
    }
}
