import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { SettingsAffiliateGeneralModel } from './settings-affiliate.model';

@Injectable()
export class SettingsAffiliateGeneralApi {
    constructor(private readonly rest: RestApiService) {}

    public view(): Observable<SettingsAffiliateGeneralModel> {
        return this.rest
            .get<ApiResponse<SettingsAffiliateGeneralModel>>('settings-affiliate-general')
            .pipe(pluck('info', 'affiliate-general'));
    }

    public update(post: SettingsAffiliateGeneralModel): Observable<SettingsAffiliateGeneralModel> {
        return this.rest
            .put<ApiResponse<SettingsAffiliateGeneralModel>>('settings-affiliate-general', post)
            .pipe(pluck('info', 'affiliate-general'));
    }
}
