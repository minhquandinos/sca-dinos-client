import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@scaleo/auth/authentication/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { userCredentials } = this.authenticationService;
        if (userCredentials) {
            request = request.clone({
                setHeaders: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'X-Auth-Token': userCredentials.accessToken
                }
            });
        }

        return next.handle(request);
    }
}
