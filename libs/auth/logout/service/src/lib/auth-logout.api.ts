import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';

@Injectable({
    providedIn: 'root'
})
export class AuthLogoutApi {
    constructor(private rest: RestApiService) {}

    logout(): Observable<void> {
        return this.rest.post<any>('logout', null);
    }
}
