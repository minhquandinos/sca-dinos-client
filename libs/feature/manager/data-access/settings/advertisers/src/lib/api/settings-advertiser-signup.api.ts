import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { AdvertiserSignupDto, AdvertiserSignUpPayloadModel } from '../models/settings-advertiser-signup.model';

@Injectable()
export class SettingsAdvertiserSignupApi {
    constructor(private readonly rest: RestApiService) {}

    view(): Observable<AdvertiserSignupDto> {
        return this.rest.get<AdvertiserSignupDto>('settings-advertiser-signup').pipe(pluck('info', 'advertiser-signup'));
    }

    update(post: AdvertiserSignUpPayloadModel): Observable<void> {
        return this.rest.put<AdvertiserSignUpPayloadModel>('settings-advertiser-signup', post);
    }
}
