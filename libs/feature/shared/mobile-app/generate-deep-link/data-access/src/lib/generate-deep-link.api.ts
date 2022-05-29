import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

@Injectable()
export class GenerateDeepLinkApi {
    constructor(private readonly rest: RestApiService) {}

    getMobileLoginLink$(): Observable<string> {
        return this.rest.get<string>('mobile-login-link').pipe(pluck('info', 'link'));
    }
}
