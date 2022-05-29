import {
    BaseStatusTranslateEnum,
    OfferLandingPageStatusIdEnum,
    OfferLandingPageStatusNameEnum,
    ScaleoStatusColorEnum
} from '../../enums/statusses';
import { entityStatusMatch } from './base-status.const';

export const OFFER_LANDING_PAGE_TRANSLATE_MAP = {
    [OfferLandingPageStatusIdEnum.Active]: BaseStatusTranslateEnum.Active,
    [OfferLandingPageStatusIdEnum.Inactive]: BaseStatusTranslateEnum.Inactive
} as const;

export const OFFER_LANDING_PAGE_STATUS_COLOR_MAP = {
    [OfferLandingPageStatusIdEnum.Active]: ScaleoStatusColorEnum.Green,
    [OfferLandingPageStatusIdEnum.Inactive]: ScaleoStatusColorEnum.Red
} as const;

export const offerLandingPageMatchStatus = (status: OfferLandingPageStatusNameEnum | OfferLandingPageStatusIdEnum) =>
    entityStatusMatch<OfferLandingPageStatusNameEnum, OfferLandingPageStatusIdEnum>(
        OfferLandingPageStatusNameEnum,
        OfferLandingPageStatusIdEnum,
        status
    );
