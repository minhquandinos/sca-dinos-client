import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateDetailSettingsUpsertModel } from './affiliate-detail-settings-upsert.model';

@Injectable()
export class AffiliateDetailSettingsWidgetApi {
    constructor(private readonly rest: RestApiService) {}

    update(id: number, settings: AffiliateDetailSettingsUpsertModel): Observable<AffiliateDetailSettingsUpsertModel> {
        const urlParameters = {
            id
        };
        return this.rest
            .put<AffiliateDetailSettingsUpsertModel>('affiliate-update-settings', settings, { urlParameters })
            .pipe(pluck('info', 'affiliate-settings'));
    }
}
