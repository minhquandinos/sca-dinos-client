import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MobileAppApi } from '../api/mobile-app.api';
import { SettingsMobileAppModel } from '../models/mobile-app.model';

@Injectable()
export class MobileAppService {
    constructor(private readonly api: MobileAppApi) {}

    view(): Observable<SettingsMobileAppModel> {
        return this.api.view();
    }

    update(post: SettingsMobileAppModel): Observable<SettingsMobileAppModel> {
        return this.api.update(post);
    }
}
