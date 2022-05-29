import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ArrayUtil, Util } from '@scaleo/utils';

import { OfferTargetingModel } from '../../../../../../../../../offer/common/src/lib/offer';
import { OfferDetailQuery } from '../../../../../../detail/data-access/src/lib/state';
import { OfferTargetingEditApi } from '../api/offer-targeting-edit.api';
import { OfferTargetingEditFormControlDto, OfferTargetingEditPayloadDto } from '../models/offer-targeting-edit.model';

@Injectable()
export class OfferTargetingEditService {
    constructor(private api: OfferTargetingEditApi, private offerDetailQuery: OfferDetailQuery) {}

    update(payload: OfferTargetingEditFormControlDto): Observable<OfferTargetingModel> {
        const newPayload: OfferTargetingEditPayloadDto = {
            gt_included_ids: ArrayUtil.join(payload.gt_included_ids),
            gt_excluded_ids: ArrayUtil.join(payload.gt_excluded_ids),
            extended_targeting: Util.jsonStringify(payload.extended_targeting),
            strict_targeting: Util.booleanToNum(payload.strict_targeting)
        };
        return this.api.update(this.offerDetailQuery.id, newPayload);
    }
}
