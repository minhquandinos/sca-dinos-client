import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsBrandingApi } from '../api/settings-branding.api';
import { SettingsBrandingImageType, SettingsBrandingModel } from '../models/branding.model';

@Injectable()
export class SettingsBrandingService {
    constructor(private readonly api: SettingsBrandingApi) {}

    public view(): Observable<SettingsBrandingModel> {
        return this.api.get();
    }

    public update(post: SettingsBrandingModel): Observable<SettingsBrandingModel> {
        return this.api.update(post);
    }

    public deleteImage(image: SettingsBrandingImageType): Observable<any> {
        return this.api.deleteImage(image);
    }
}
