import { Injectable } from '@angular/core';

import { OfferTrackingSettingsModel } from '../../../../../view-info/data-access/src/lib/models/offer-tracking-settings.model';
import { OfferTrackingSettingsEditApi } from '../api/offer-tracking-settings-edit.api';
import { OfferTrackingSettingsPayloadDto } from '../model/offer-tracking-settings-edit.model';

@Injectable()
export class OfferTrackingSettingsEditService {
    constructor(private readonly api: OfferTrackingSettingsEditApi) {}

    update(id: number, data: OfferTrackingSettingsPayloadDto): Promise<OfferTrackingSettingsModel> {
        return this.api.update(id, data).toPromise();
    }
}
