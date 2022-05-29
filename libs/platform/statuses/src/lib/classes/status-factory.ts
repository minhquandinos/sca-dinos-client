import {
    AdjustmentsStatusesIdEnum,
    AnnouncementStatusIdEnum,
    DeliveryStatusNameEnum,
    OfferAvailabilityEnum,
    OfferLandingPageStatusIdEnum,
    OfferRequestStatusEnum,
    ScaleoStatusEnum,
    ScaleoStatusesType
} from '@scaleo/platform/list/access-data';

import { StatusInterface } from './status.interface';
import { StatusAdjustments } from './statuses/status-adjustments';
import { StatusAnnouncement } from './statuses/status-announcement';
import { StatusBase } from './statuses/status-base';
import { StatusConversion } from './statuses/status-conversion';
import { StatusDelivery } from './statuses/status-delivery';
import { StatusGoal } from './statuses/status-goal';
import { StatusInvoices } from './statuses/status-invoices';
import { StatusOfferAvailability } from './statuses/status-offer-availability';
import { StatusOfferRequest } from './statuses/status-offer-request';
import { StatusOfferUrls } from './statuses/status-offer-urls';
import { StatusPayment } from './statuses/status-payment';

export class StatusFactory {
    constructor(private type: ScaleoStatusesType, private status: number | string) {}

    create(): StatusInterface {
        switch (this.type) {
            case ScaleoStatusEnum.Statuses:
            case ScaleoStatusEnum.Postback:
            case ScaleoStatusEnum.Offers:
            case ScaleoStatusEnum.Creatives:
            case ScaleoStatusEnum.CustomParams:
                return new StatusBase(this.status as number);
            case ScaleoStatusEnum.Conversion:
                return new StatusConversion(this.status as any);
            case ScaleoStatusEnum.Payment:
                return new StatusPayment(this.status as number);
            case ScaleoStatusEnum.Goals:
                return new StatusGoal(this.status as number);
            case ScaleoStatusEnum.Invoices:
                return new StatusInvoices(this.status as any);
            case ScaleoStatusEnum.Delivery:
                return new StatusDelivery(this.status as DeliveryStatusNameEnum);
            case ScaleoStatusEnum.OfferLandingPage:
                return new StatusOfferUrls(this.status as OfferLandingPageStatusIdEnum);
            case ScaleoStatusEnum.OfferAvailability:
                return new StatusOfferAvailability(this.status as OfferAvailabilityEnum);
            case ScaleoStatusEnum.Adjustments:
                return new StatusAdjustments(this.status as AdjustmentsStatusesIdEnum);
            case ScaleoStatusEnum.Announcement:
                return new StatusAnnouncement(this.status as AnnouncementStatusIdEnum);
            case ScaleoStatusEnum.OfferRequest:
                return new StatusOfferRequest(this.status as OfferRequestStatusEnum);
            default:
                return undefined;
        }
    }
}
