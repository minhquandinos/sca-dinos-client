import { ScaleoStatusEnum } from '../../enums/statusses';
import { ADJUSTMENTS_STATUS_TRANSLATE_MAP } from './adjustments-status.const';
import { ANNOUNCEMENT_STATUS_TRANSLATE_MAP } from './announcement-status.const';
import { BASE_STATUS_TRANSLATE_MAP } from './base-status.const';
import { CONVERSION_STATUS_TRANSLATE_MAP } from './conversions-status.const';
import { GOALS_STATUS_TRANSLATE_MAP } from './goal-status.const';
import { INVOICE_STATUS_TRANSLATE_MAP } from './invoice-status-translate';
import { OFFER_AVAILABILITY_STATUS_TRANSLATE_MAP } from './offer-availability-status.const';
import { OFFER_REQUEST_STATUS_TRANSLATE_MAP } from './offer-request-statuses.const';
import { OFFER_LANDING_PAGE_TRANSLATE_MAP } from './offer-urls-statuses.const';
import { PAYMENT_STATUS_TRANSLATE_MAP } from './payment-status-translate.const';

export const PLATFORM_STATUSES_LIST_MAP = {
    [ScaleoStatusEnum.Statuses]: BASE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Postback]: BASE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Offers]: BASE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Conversion]: CONVERSION_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Payment]: PAYMENT_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Goals]: GOALS_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Invoices]: INVOICE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Creatives]: BASE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.OfferLandingPage]: OFFER_LANDING_PAGE_TRANSLATE_MAP,
    [ScaleoStatusEnum.CustomParams]: BASE_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.OfferRequest]: OFFER_REQUEST_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.OfferAvailability]: OFFER_AVAILABILITY_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Adjustments]: ADJUSTMENTS_STATUS_TRANSLATE_MAP,
    [ScaleoStatusEnum.Announcement]: ANNOUNCEMENT_STATUS_TRANSLATE_MAP
};
