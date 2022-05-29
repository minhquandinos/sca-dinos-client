import {
    ADJUSTMENTS_STATUS_COLOR_MAP,
    ADJUSTMENTS_STATUS_TRANSLATE_MAP,
    AdjustmentsStatusesIdEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

export class StatusAdjustments implements StatusInterface {
    constructor(private readonly status: AdjustmentsStatusesIdEnum) {}

    makeColor(): string {
        return ADJUSTMENTS_STATUS_COLOR_MAP[this.status];
    }

    makeLabel(): string {
        const label = ADJUSTMENTS_STATUS_TRANSLATE_MAP;
        return label?.[this.status];
    }
}
