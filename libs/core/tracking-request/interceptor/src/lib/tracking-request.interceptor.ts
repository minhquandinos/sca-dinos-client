import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';

import { TrackingRequestService } from '@scaleo/core/tracking-request/service';

@Injectable()
export class TrackingRequestInterceptor implements HttpInterceptor {
    constructor(private readonly trackingRequestService: TrackingRequestService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next?.handle(request).pipe(
            debounceTime(0),
            tap((event) => {
                if (this.trackingRequestService.id) {
                    if (event?.type === 0) {
                        this.trackingRequestService.add(request.url);
                    } else {
                        this.trackingRequestService.remove(request.url);
                    }
                }
            }),
            catchError((err) => {
                if (this.trackingRequestService.id) {
                    this.trackingRequestService.remove(request.url);
                }
                return throwError(err);
            })
        );
    }
}
