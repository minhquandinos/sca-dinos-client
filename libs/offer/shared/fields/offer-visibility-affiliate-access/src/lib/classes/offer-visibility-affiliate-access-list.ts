import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { OfferVisibilityModel } from '@scaleo/offer/common';
import { DateFormatService } from '@scaleo/platform/format/service';
import { BaseStatusTranslateEnum } from '@scaleo/platform/list/access-data';

import { BaseOfferVisibilityAffiliateAccess } from './base-offer-visibility-affiliate-access';
import { OfferVisibilityStatusAffiliateAccessEnum } from './offer-visibility-status-affiliate-access.enum';

const STATUSES_TRANSLATE = 'offers_page.request';

export class OfferVisibilityAffiliateAccessList extends BaseOfferVisibilityAffiliateAccess {
    constructor(
        protected readonly _visibility: OfferVisibilityModel | OfferVisibilityModel[],
        private readonly translate: TranslateService,
        private readonly dateFormatService: DateFormatService
    ) {
        super(_visibility);
    }

    baseLabel(): Observable<string> {
        const map = {
            [OfferVisibilityStatusAffiliateAccessEnum.Available]: BaseStatusTranslateEnum.Available,
            [OfferVisibilityStatusAffiliateAccessEnum.Require]: BaseStatusTranslateEnum.RequireApproval,
            [OfferVisibilityStatusAffiliateAccessEnum.Rejected]: BaseStatusTranslateEnum.RequestRejected
        };

        const key = map?.[this.status];
        if (key) {
            return this.translate.stream(key);
        }
        return EMPTY;
    }

    requestLabel(): Observable<string> {
        const map = {
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRequire]: () =>
                this.translate.stream(`${STATUSES_TRANSLATE}.pending`, {
                    date: this.dateFormatService.format(+this.visibilityRequestLast?.updated)
                }),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRejected]: () => this.translate.stream(`${STATUSES_TRANSLATE}.rejected`),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestApproved]: () => this.translate.stream(BaseStatusTranslateEnum.Available)
        };

        const fn = map[this.status];
        return typeof fn === 'function' ? fn() : EMPTY;
    }
}
