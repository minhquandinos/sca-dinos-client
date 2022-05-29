import {
    OFFER_AVAILABILITY_STATUS_COLOR_MAP,
    OFFER_AVAILABILITY_STATUS_TRANSLATE_MAP,
    OfferAvailabilityEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusOfferAvailability implements StatusInterface {
    constructor(private readonly status: OfferAvailabilityEnum) {}

    makeColor(): string {
        return OFFER_AVAILABILITY_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = OFFER_AVAILABILITY_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
