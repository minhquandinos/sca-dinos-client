import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { SettingsAffiliateGeneralModel } from './settings-affiliate.model';
import { SettingsAffiliateGeneralApi } from './settings-affiliate-general.api';

@Injectable()
export class SettingsAffiliateGeneralService {
    constructor(private readonly api: SettingsAffiliateGeneralApi, private readonly jsonConvertService: JsonConvertService) {}

    public view(): Observable<SettingsAffiliateGeneralModel> {
        return this.api.view().pipe(
            map((response) => {
                return this.jsonConvertService.mapper(SettingsAffiliateGeneralModel, response);
            })
        );
    }

    public update(post: SettingsAffiliateGeneralModel): Observable<SettingsAffiliateGeneralModel> {
        return this.api.update(post);
    }
}
