import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AffiliateDetailSettingsUpsertModel } from './affiliate-detail-settings-upsert.model';
import { AffiliateDetailSettingsWidgetApi } from './affiliate-detail-settings-widget.api';

@Injectable()
export class AffiliateDetailSettingsWidgetService {
    constructor(private readonly api: AffiliateDetailSettingsWidgetApi) {}

    update(id: number, settings: AffiliateDetailSettingsUpsertModel): Observable<AffiliateDetailSettingsUpsertModel> {
        return this.api.update(id, settings);
    }
}
