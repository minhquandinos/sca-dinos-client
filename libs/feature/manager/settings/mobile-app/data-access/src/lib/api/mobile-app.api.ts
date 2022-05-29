import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { SettingsMobileAppModel } from '../models/mobile-app.model';

@Injectable()
export class MobileAppApi {
    constructor(private readonly rest: RestApiService) {}

    view(): Observable<SettingsMobileAppModel> {
        return this.rest.get<SettingsMobileAppModel>('mobile-app-settings').pipe(pluck('info', 'settings'));
    }

    update(post: SettingsMobileAppModel): Observable<SettingsMobileAppModel> {
        return this.rest.put<SettingsMobileAppModel>('mobile-app-settings', post);
    }
}
