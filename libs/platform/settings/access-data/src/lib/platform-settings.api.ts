import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';

import { PlatformSettingsModel } from './platform-settings.models';

@Injectable({
    providedIn: 'root'
})
export class PlatformSettingsApi {
    constructor(private readonly rest: RestApiService, private readonly http: HttpClient, private readonly env: EnvService) {}

    get(): Observable<PlatformSettingsModel> {
        return this.http.post<any>(`${this.env.serverUrl}/platform/settings`, null).pipe(pluck('info', 'settings'));
    }
}
