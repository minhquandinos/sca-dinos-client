import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { SettingsBrandingImageType, SettingsBrandingModel } from '../models/branding.model';

@Injectable()
export class SettingsBrandingApi {
    constructor(private readonly rest: RestApiService) {}

    public get(): Observable<SettingsBrandingModel> {
        return this.rest.get<ApiResponse<SettingsBrandingModel>>('branding-settings').pipe(pluck('info', 'branding'));
    }

    public update(post: SettingsBrandingModel): Observable<SettingsBrandingModel> {
        return this.rest.put<ApiResponse<SettingsBrandingModel>>('branding-settings', post);
    }

    public deleteImage(image: SettingsBrandingImageType = 'logo'): Observable<any> {
        return this.rest.delete<any>('branding-settings-delete-image', {
            urlParameters: {
                image
            }
        });
    }
}
