import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';

import { PlatformSettingsModel } from './platform-settings.models';
import { PlatformSettingsState, PlatformSettingsStore } from './platform-settings.store';

@Injectable({ providedIn: 'root' })
export class PlatformSettingsQuery extends Query<PlatformSettingsState> {
    constructor(protected store: PlatformSettingsStore) {
        super(store);
    }

    get settings(): PlatformSettingsModel {
        return this.getValue();
    }

    get settings$(): Observable<PlatformSettingsModel> {
        return this.select();
    }
}
