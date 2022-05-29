import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { AffiliateSignupModel, AffiliateSignUpPayloadModel } from './affiliate-signup.model';
import { SettingsAffiliateSignupApi } from './settings-affiliate-signup.api';

@Injectable()
export class SettingsAffiliateSignupService {
    constructor(private readonly api: SettingsAffiliateSignupApi, private readonly jsonConvertService: JsonConvertService) {}

    view(): Observable<AffiliateSignupModel> {
        return this.api.view().pipe(map((data) => this.jsonConvertService.mapper(AffiliateSignupModel, data)));
    }

    update(post: AffiliateSignupModel): Observable<void> {
        return this.api.update(this.jsonConvertService.mapper(AffiliateSignUpPayloadModel, post));
    }
}
