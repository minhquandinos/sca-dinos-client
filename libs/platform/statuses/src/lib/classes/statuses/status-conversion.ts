import { BaseObjectModel } from '@scaleo/core/data';
import {
    CONVERSION_STATUS_NAME_TRANSLATE_MAP,
    CONVERSION_STATUS_TRANSLATE_MAP,
    CONVERSION_STATUSES_ID,
    CONVERSION_STATUSES_NAME,
    platformConversionStatusIsName,
    PlatformConversionStatusNameValueType,
    PlatformConversionStatusValueType,
    ScaleoStatusColorEnum
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from '../status.interface';

const colorNameMap: Record<PlatformConversionStatusNameValueType, ScaleoStatusColorEnum> = {
    [CONVERSION_STATUSES_NAME.approved]: ScaleoStatusColorEnum.Green,
    [CONVERSION_STATUSES_NAME.pending]: ScaleoStatusColorEnum.Orange,
    [CONVERSION_STATUSES_NAME.rejected]: ScaleoStatusColorEnum.Red,
    [CONVERSION_STATUSES_NAME.trash]: ScaleoStatusColorEnum.Red
};

const colorIdMap: Record<PlatformConversionStatusValueType, ScaleoStatusColorEnum> = {
    [CONVERSION_STATUSES_ID.approved]: ScaleoStatusColorEnum.Green,
    [CONVERSION_STATUSES_ID.pending]: ScaleoStatusColorEnum.Orange,
    [CONVERSION_STATUSES_ID.rejected]: ScaleoStatusColorEnum.Red,
    [CONVERSION_STATUSES_ID.trash]: ScaleoStatusColorEnum.Red
};

export class StatusConversion implements StatusInterface {
    constructor(private status: PlatformConversionStatusValueType | PlatformConversionStatusNameValueType) {}

    makeColor(): string {
        const colorMap: BaseObjectModel = platformConversionStatusIsName(this.status) ? colorNameMap : colorIdMap;
        return colorMap?.[this.status];
    }

    makeLabel(): string {
        const translate = platformConversionStatusIsName(this.status)
            ? CONVERSION_STATUS_NAME_TRANSLATE_MAP
            : CONVERSION_STATUS_TRANSLATE_MAP;

        return translate?.[this.status];
    }
}
