import { DELIVERY_STATUS_COLOR_MAP, DELIVERY_STATUS_TRANSLATE_MAP, DeliveryStatusNameEnum } from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusDelivery implements StatusInterface {
    constructor(private readonly status: DeliveryStatusNameEnum) {}

    makeColor(): string {
        return DELIVERY_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = DELIVERY_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
