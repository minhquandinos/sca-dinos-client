import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { OfferVisibilityModel } from '@scaleo/offer/common';
import { DateFormatService } from '@scaleo/platform/format/service';
import { BaseStatusTranslateEnum } from '@scaleo/platform/list/access-data';

import { BaseOfferVisibilityAffiliateAccess } from './base-offer-visibility-affiliate-access';
import { OfferVisibilityStatusAffiliateAccessEnum } from './offer-visibility-status-affiliate-access.enum';

const STATUSES_TRANSLATE = 'offers_page.request';

export class OfferVisibilityAffiliateAccessView extends BaseOfferVisibilityAffiliateAccess {
    constructor(
        protected readonly _visibility: OfferVisibilityModel | OfferVisibilityModel[],
        private readonly translate: TranslateService,
        private readonly dateFormatService: DateFormatService
    ) {
        super(_visibility);
    }

    get showRequestButton(): boolean {
        return this.status === OfferVisibilityStatusAffiliateAccessEnum.Require;
    }

    get showHideCard(): boolean {
        return [
            OfferVisibilityStatusAffiliateAccessEnum.Rejected,
            OfferVisibilityStatusAffiliateAccessEnum.Require,
            OfferVisibilityStatusAffiliateAccessEnum.RequestRequire,
            OfferVisibilityStatusAffiliateAccessEnum.RequestRejected
        ].includes(this.status);
    }

    baseLabel(): Observable<string> {
        const map: BaseObjectModel = {
            [OfferVisibilityStatusAffiliateAccessEnum.Available]: `${STATUSES_TRANSLATE}.active`,
            [OfferVisibilityStatusAffiliateAccessEnum.Rejected]: BaseStatusTranslateEnum.RequestRejected
        };

        const key = map?.[this.status];
        if (key) {
            return this.translate.stream(key);
        }
        return EMPTY;
    }

    requestLabel(): Observable<string> {
        const translateKey = 'offers_page.request';
        const map: BaseObjectModel = {
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRequire]: () =>
                this.translate.stream(`${translateKey}.pending`, {
                    date: this.dateFormatService.format(+this.visibilityRequestLast?.updated)
                }),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRejected]: () => this.translate.stream(`${translateKey}.rejected`),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestApproved]: () => this.translate.stream(`${STATUSES_TRANSLATE}.active`)
        };

        const fn = map[this.status];
        return typeof fn === 'function' ? fn() : EMPTY;
    }
}
