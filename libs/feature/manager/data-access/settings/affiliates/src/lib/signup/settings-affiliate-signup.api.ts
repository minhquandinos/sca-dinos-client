import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateSignupDto, AffiliateSignUpPayloadModel } from './affiliate-signup.model';

@Injectable()
export class SettingsAffiliateSignupApi {
    constructor(private readonly rest: RestApiService) {}

    view(): Observable<AffiliateSignupDto> {
        return this.rest.get<AffiliateSignupDto>('settings-affiliate-signup').pipe(pluck('info', 'affiliate-signup'));
    }

    update(post: AffiliateSignUpPayloadModel): Observable<void> {
        return this.rest.put<AffiliateSignUpPayloadModel>('settings-affiliate-signup', post);
    }
}
