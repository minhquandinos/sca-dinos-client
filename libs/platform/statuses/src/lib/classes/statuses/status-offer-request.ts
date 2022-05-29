import {
    OFFER_REQUEST_STATUS_COLOR_MAP,
    OFFER_REQUEST_STATUS_TRANSLATE_MAP,
    OfferRequestStatusEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusOfferRequest implements StatusInterface {
    constructor(private readonly status: OfferRequestStatusEnum) {}

    makeColor(): string {
        return OFFER_REQUEST_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = OFFER_REQUEST_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
