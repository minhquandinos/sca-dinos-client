import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { NewProfileService } from '@scaleo/account/data-access';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

import { SecurityApi } from '../api/security.api';
import { SecurityControlEnum } from '../enums/security-control.enum';
import { SecurityDto, SecurityModel } from '../models/security.model';

const SECURITY_SCHEMA = 'administration_settings.security';

@Injectable()
export class SecurityService {
    constructor(
        private api: SecurityApi,
        private jsonConvert: JsonConvertService,
        private readonly toastr: ToastrBarService,
        private readonly profileService: NewProfileService,
        private readonly platformSettingsService: NewPlatformSettingsService
    ) {}

    view(): Observable<SecurityModel> {
        return this.api.view().pipe(map((data) => this.jsonConvert.mapper(SecurityModel, data)));
    }

    update(payload: SecurityDto): Observable<any> {
        return this.api.update(payload).pipe(
            tap(() => {
                this.toastr.successResponse(`${SECURITY_SCHEMA}.toastr.update`);
                this.profileService.updateStoreKey('twoFA_enabled', payload[SecurityControlEnum.Manager]);
                this.platformSettingsService.updateStoreKey(
                    'advertiser_token_for_postback',
                    payload[SecurityControlEnum.AdvertiserPostbackToken]
                );
            }),
            catchError((error) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, `${SECURITY_SCHEMA}.title`);
                return throwError(error);
            })
        );
    }
}
