import { OfferAvailabilityEnum, OfferAvailabilityTranslateEnum } from '../../enums/platform-list';

export const OFFER_AVAILABILITY_TRANSLATE_MAP = Object.freeze({
    [OfferAvailabilityEnum.Available]: OfferAvailabilityTranslateEnum.Available,
    [OfferAvailabilityEnum.RequireApproval]: OfferAvailabilityTranslateEnum.RequireApproval
});
