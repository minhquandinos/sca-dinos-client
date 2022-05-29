import { DOCUMENT } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WindowRefService } from '@scaleo/core/window-ref/service';

@Injectable()
export class ConnectionInterceptor implements HttpInterceptor {
    constructor(private window: WindowRefService, private router: Router, @Inject(DOCUMENT) private document: Document) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const url = new URL(this.document.location.href);

        const ignoredReturnUrl = ['/connection-lost', '/login', '/logout'];

        if (!this.window.nativeWindow.navigator.onLine && url.pathname !== '/error') {
            const returnUrl = !ignoredReturnUrl.includes(url.pathname) ? url.pathname : null;
            this.router.navigate(['/connection-lost'], { queryParams: { returnUrl } });
        }

        return next.handle(request);
    }
}
