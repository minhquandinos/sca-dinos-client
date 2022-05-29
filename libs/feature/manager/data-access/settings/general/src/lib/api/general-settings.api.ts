import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { GeneralSettingsModel } from '../models/general-settings.model';

@Injectable()
export class GeneralSettingsApi {
    constructor(private readonly rest: RestApiService) {}

    public view(): Observable<GeneralSettingsModel> {
        return this.rest.get<ApiResponse<GeneralSettingsModel>>('general-settings').pipe(pluck('info', 'settings'));
    }

    public update(post: GeneralSettingsModel): Observable<GeneralSettingsModel> {
        return this.rest.put<ApiResponse<GeneralSettingsModel>>('general-settings', post).pipe(pluck('info', 'settings'));
    }
}
