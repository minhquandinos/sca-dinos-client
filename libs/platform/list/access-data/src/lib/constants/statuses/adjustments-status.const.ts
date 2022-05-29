import { BaseObjectModel } from '@scaleo/core/data';

import { AdjustmentsStatusesIdEnum, AdjustmentsStatusesTranslateEnum, ScaleoStatusColorEnum } from '../../enums/statusses';

export const ADJUSTMENTS_STATUS_TRANSLATE_MAP: BaseObjectModel = Object.freeze({
    [AdjustmentsStatusesIdEnum.Active]: AdjustmentsStatusesTranslateEnum.Active,
    [AdjustmentsStatusesIdEnum.Completed]: AdjustmentsStatusesTranslateEnum.Completed,
    [AdjustmentsStatusesIdEnum.Processing]: AdjustmentsStatusesTranslateEnum.Processing,
    [AdjustmentsStatusesIdEnum.Failed]: AdjustmentsStatusesTranslateEnum.Failed
});

export const ADJUSTMENTS_STATUS_COLOR_MAP: BaseObjectModel = Object.freeze({
    [AdjustmentsStatusesIdEnum.Active]: ScaleoStatusColorEnum.Green,
    [AdjustmentsStatusesIdEnum.Completed]: ScaleoStatusColorEnum.Green,
    [AdjustmentsStatusesIdEnum.Processing]: ScaleoStatusColorEnum.Orange,
    [AdjustmentsStatusesIdEnum.Failed]: ScaleoStatusColorEnum.Red
});
