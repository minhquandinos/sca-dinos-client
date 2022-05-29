import { OfferAvailabilityEnum } from '../../enums/platform-list';
import { ScaleoStatusColorEnum } from '../../enums/statusses';
import { OFFER_AVAILABILITY_TRANSLATE_MAP } from '../platform-list';

export const OFFER_AVAILABILITY_STATUS_TRANSLATE_MAP = OFFER_AVAILABILITY_TRANSLATE_MAP;

export const OFFER_AVAILABILITY_STATUS_COLOR_MAP = {
    [OfferAvailabilityEnum.Available]: ScaleoStatusColorEnum.Green,
    [OfferAvailabilityEnum.RequireApproval]: ScaleoStatusColorEnum.Orange
} as const;
