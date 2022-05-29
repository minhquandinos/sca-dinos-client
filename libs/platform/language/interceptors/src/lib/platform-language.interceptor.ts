import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class PlatformLanguageInterceptor implements HttpInterceptor {
    constructor(private readonly translate: TranslateService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const lang = this.translate.currentLang;
        if (lang) {
            const params = request.clone().params.append('lang', lang);
            request = request.clone({
                params
            });
        }

        return next.handle(request);
    }
}
