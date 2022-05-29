import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ArrayUtil } from '../../../../../../../../../utils/src/lib';
import { OfferDetailQuery } from '../../../../../../detail/data-access/src/lib/state';
import { OfferAffiliateAccessEditApi } from '../api/offer-affiliate-access-edit.api';
import { OfferAffiliateAccessFormControlModel, OfferAffiliateAccessPayloadParamsDto } from '../models/offer-affiliate-access.model';

@Injectable()
export class OfferAffiliateAccessEditService {
    constructor(private readonly api: OfferAffiliateAccessEditApi, private readonly offerDetailQuery: OfferDetailQuery) {}

    update(value: OfferAffiliateAccessFormControlModel) {
        const payload: OfferAffiliateAccessPayloadParamsDto = {
            ...value,
            allowed_affiliates: ArrayUtil.join(value.allowed_affiliates),
            denied_affiliates: ArrayUtil.join(value.denied_affiliates)
        };
        return this.api.update(this.offerDetailQuery.id, payload).pipe(
            map(({ allowed_affiliates, denied_affiliates, visible_type, ask_approval_questions, questions }) => ({
                allowed_affiliates,
                denied_affiliates,
                visible_type,
                ask_approval_questions,
                questions
            }))
        );
    }
}
