import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { SecurityDto, SecurityModel } from '../models/security.model';

@Injectable()
export class SecurityApi {
    constructor(private readonly rest: RestApiService) {}

    view(): Observable<SecurityDto> {
        return this.rest.get<ApiResponse<SecurityModel>>('settings-security').pipe(pluck('info', 'settings'));
    }

    update(payload: SecurityDto): Observable<any> {
        return this.rest.put('settings-security', payload);
    }
}
