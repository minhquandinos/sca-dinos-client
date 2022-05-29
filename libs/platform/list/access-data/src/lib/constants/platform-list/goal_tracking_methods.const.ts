import { BaseObjectModel } from '@scaleo/core/data';

import { GoalTrackingMethodIdEnum, GoalTrackingMethodTranslateEnum } from '../../enums/platform-list';

export const GOAL_TRACKING_METHOD_LIST_TRANSLATE_MAP: BaseObjectModel = Object.freeze({
    [GoalTrackingMethodIdEnum.Postback]: GoalTrackingMethodTranslateEnum.Postback,
    [GoalTrackingMethodIdEnum.Iframe]: GoalTrackingMethodTranslateEnum.Iframe,
    [GoalTrackingMethodIdEnum.JsPixel]: GoalTrackingMethodTranslateEnum.JsPixel,
    [GoalTrackingMethodIdEnum.ImgPixel]: GoalTrackingMethodTranslateEnum.ImgPixel
});
