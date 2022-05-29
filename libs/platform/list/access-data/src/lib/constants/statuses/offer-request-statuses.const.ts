import { OfferRequestStatusEnum, OfferRequestStatusTranslate } from '../../enums/statusses/offer-request-status.enum';
import { ScaleoStatusColorEnum } from '../../enums/statusses/scaleo-status.enum';
import { PlatformListOffersRequestsStatusesModel } from '../../models/platform-list.model';

export const OFFERS_REQUEST_STATUS_MAP: PlatformListOffersRequestsStatusesModel[] = [
    { id: OfferRequestStatusEnum.Approved, title: 'Approved', key: OfferRequestStatusEnum.Approved },
    {
        id: OfferRequestStatusEnum.Pending,
        title: 'Pending',
        key: OfferRequestStatusEnum.Pending
    },
    { id: OfferRequestStatusEnum.Rejected, title: 'Rejected', key: OfferRequestStatusEnum.Rejected }
];

export const OFFER_REQUEST_STATUS_TRANSLATE_MAP = {
    [OfferRequestStatusEnum.Approved]: OfferRequestStatusTranslate.Approved,
    [OfferRequestStatusEnum.Pending]: OfferRequestStatusTranslate.Pending,
    [OfferRequestStatusEnum.Rejected]: OfferRequestStatusTranslate.Rejected
} as const;

export const OFFER_REQUEST_STATUS_COLOR_MAP = {
    [OfferRequestStatusEnum.Approved]: ScaleoStatusColorEnum.Green,
    [OfferRequestStatusEnum.Pending]: ScaleoStatusColorEnum.Orange,
    [OfferRequestStatusEnum.Rejected]: ScaleoStatusColorEnum.Red
} as const;
