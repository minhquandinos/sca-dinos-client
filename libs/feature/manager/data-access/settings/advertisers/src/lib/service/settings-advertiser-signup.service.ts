import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { SettingsAdvertiserSignupApi } from '../api/settings-advertiser-signup.api';
import { AdvertiserSignUpPayloadModel, SettingsAdvertiserSignupModel } from '../models/settings-advertiser-signup.model';

@Injectable()
export class SettingsAdvertiserSignupService {
    constructor(private readonly api: SettingsAdvertiserSignupApi, private readonly jsonConvertService: JsonConvertService) {}

    view(): Observable<SettingsAdvertiserSignupModel> {
        return this.api.view().pipe(map((data) => this.jsonConvertService.mapper(SettingsAdvertiserSignupModel, data)));
    }

    update(post: SettingsAdvertiserSignupModel): Observable<void> {
        return this.api.update(this.jsonConvertService.mapper(AdvertiserSignUpPayloadModel, post));
    }
}
