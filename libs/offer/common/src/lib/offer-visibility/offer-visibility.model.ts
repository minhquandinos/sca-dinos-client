import { OfferRequestStatusEnum, OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

import { OfferVisibilityRequestStatusIdEnum } from './index';

export interface OfferVisibilityModel {
    id: OffersVisibilityIdEnum;
    title: string;
    availability: keyof Omit<Record<OfferRequestStatusEnum, string>, 'pending'>;
    requests: OfferVisibilityRequestsModel[];
}

export interface OfferVisibilityRequestsModel {
    id: number;
    offer_id: number;
    affiliate_id: number;
    status: OfferVisibilityRequestStatusIdEnum;
    additional_info: any;
    created: number;
    updated: number;
}
