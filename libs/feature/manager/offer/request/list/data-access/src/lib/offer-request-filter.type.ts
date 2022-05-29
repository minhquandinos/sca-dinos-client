import { OfferRequestsFilterEnum } from './offer-requests-filter.enum';

export type OfferRequestFilterType = keyof Record<OfferRequestsFilterEnum, string> | `${OfferRequestsFilterEnum}`;
