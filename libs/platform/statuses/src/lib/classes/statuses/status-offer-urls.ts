import {
    OFFER_LANDING_PAGE_STATUS_COLOR_MAP,
    OFFER_LANDING_PAGE_TRANSLATE_MAP,
    OfferLandingPageStatusIdEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusOfferUrls implements StatusInterface {
    constructor(private readonly status: OfferLandingPageStatusIdEnum) {}

    makeColor(): string {
        return OFFER_LANDING_PAGE_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = OFFER_LANDING_PAGE_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
