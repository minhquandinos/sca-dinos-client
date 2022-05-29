import { GoalConverterInput, TrackingMethodsEnum } from '@scaleo/offer/common';

import { GoalsTrackingCode } from './goals-tracking-code';

export class GoalsConverter {
    public convertTrackingCode(input: GoalConverterInput): string {
        const { trackingType, trackingLink, typeGoal, goalId, alias, goalIsDefault, postbackToken } = input;

        const trackingCode = new GoalsTrackingCode(goalId.toString(), typeGoal, new URL(`${trackingLink}/track`));

        switch (trackingType) {
            case TrackingMethodsEnum.Postback:
                return trackingCode.postback(goalIsDefault, alias, postbackToken);
            case TrackingMethodsEnum.IframePixel:
                return trackingCode.iframePixel();
            case TrackingMethodsEnum.JavaScriptPixel:
                return trackingCode.javascriptPixel();
            case TrackingMethodsEnum.ImgPixel:
                return trackingCode.imgPixel();
            default:
                return undefined;
        }
    }
}
