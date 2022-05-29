import { BaseObjectModel } from '@scaleo/core/data';

import {
    CONVERSION_STATUSES_ID,
    CONVERSION_STATUSES_NAME,
    CONVERSION_STATUSES_TRANSLATE,
    PlatformConversionStatusNameValueType,
    PlatformConversionStatusValueType,
    ScaleoStatusColorEnum
} from '../../enums/statusses';

export const CONVERSION_STATUS_TRANSLATE_MAP: BaseObjectModel = {
    [CONVERSION_STATUSES_ID.approved]: CONVERSION_STATUSES_TRANSLATE.approved,
    [CONVERSION_STATUSES_ID.pending]: CONVERSION_STATUSES_TRANSLATE.pending,
    [CONVERSION_STATUSES_ID.rejected]: CONVERSION_STATUSES_TRANSLATE.rejected,
    [CONVERSION_STATUSES_ID.trash]: CONVERSION_STATUSES_TRANSLATE.trash
} as const;

export const CONVERSION_STATUS_COLOR_MAP: BaseObjectModel = Object.freeze({
    [CONVERSION_STATUSES_ID.approved]: ScaleoStatusColorEnum.Green,
    [CONVERSION_STATUSES_ID.pending]: ScaleoStatusColorEnum.Orange,
    [CONVERSION_STATUSES_ID.rejected]: ScaleoStatusColorEnum.Red,
    [CONVERSION_STATUSES_ID.trash]: ScaleoStatusColorEnum.Gray
});

export const CONVERSION_STATUS_NAME_TRANSLATE_MAP: BaseObjectModel = {
    [CONVERSION_STATUSES_NAME.approved]: CONVERSION_STATUSES_TRANSLATE.approved,
    [CONVERSION_STATUSES_NAME.pending]: CONVERSION_STATUSES_TRANSLATE.pending,
    [CONVERSION_STATUSES_NAME.rejected]: CONVERSION_STATUSES_TRANSLATE.rejected,
    [CONVERSION_STATUSES_NAME.trash]: CONVERSION_STATUSES_TRANSLATE.trash
} as const;

export const CONVERSION_STATUS_NAME_COLOR_MAP: BaseObjectModel = {
    [CONVERSION_STATUSES_NAME.approved]: CONVERSION_STATUSES_TRANSLATE.approved,
    [CONVERSION_STATUSES_NAME.pending]: CONVERSION_STATUSES_TRANSLATE.pending,
    [CONVERSION_STATUSES_NAME.rejected]: CONVERSION_STATUSES_TRANSLATE.rejected,
    [CONVERSION_STATUSES_NAME.trash]: CONVERSION_STATUSES_TRANSLATE.trash
} as const;

export const platformConversionStatusIsName = (status: PlatformConversionStatusValueType | PlatformConversionStatusNameValueType) => {
    return [
        CONVERSION_STATUSES_NAME.approved,
        CONVERSION_STATUSES_NAME.pending,
        CONVERSION_STATUSES_NAME.rejected,
        CONVERSION_STATUSES_NAME.trash
    ].includes(status as PlatformConversionStatusNameValueType);
};
