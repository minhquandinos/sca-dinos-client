import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GeneralSettingsApi } from '../api/general-settings.api';
import { GeneralSettingsModel } from '../models/general-settings.model';

@Injectable()
export class GeneralSettingsService {
    constructor(private readonly api: GeneralSettingsApi) {}

    view(): Observable<GeneralSettingsModel> {
        return this.api.view();
    }

    update(post: GeneralSettingsModel): Observable<GeneralSettingsModel> {
        return this.api.update(post);
    }
}
