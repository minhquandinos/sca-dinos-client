import { EMPTY, Observable } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { OfferVisibilityModel, OfferVisibilityRequestsModel, OfferVisibilityRequestStatusIdEnum } from '@scaleo/offer/common';
import { OfferRequestStatusEnum, OffersVisibilityIdEnum, ScaleoStatusColorEnum } from '@scaleo/platform/list/access-data';
import { ArrayUtil } from '@scaleo/utils';

import { OfferVisibilityStatusAffiliateAccessEnum } from './offer-visibility-status-affiliate-access.enum';

interface OfferVisibilityAffiliateAccessStatusModel {
    status: OfferVisibilityStatusAffiliateAccessEnum;
    color: ScaleoStatusColorEnum;
}

export abstract class BaseOfferVisibilityAffiliateAccess {
    protected constructor(protected readonly _visibility: OfferVisibilityModel | OfferVisibilityModel[]) {}

    get color(): string {
        return this.prepare.color;
    }

    get label$(): Observable<string> {
        const map = {
            [OfferVisibilityStatusAffiliateAccessEnum.Available]: () => this.baseLabel(),
            [OfferVisibilityStatusAffiliateAccessEnum.Require]: () => this.baseLabel(),
            [OfferVisibilityStatusAffiliateAccessEnum.Rejected]: () => this.baseLabel(),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestApproved]: () => this.requestLabel(),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRequire]: () => this.requestLabel(),
            [OfferVisibilityStatusAffiliateAccessEnum.RequestRejected]: () => this.requestLabel()
        };
        const fn = map[this.status];
        if (typeof fn === 'function') {
            return fn();
        }

        return EMPTY;
    }

    abstract baseLabel(): Observable<string>;

    abstract requestLabel(): Observable<string>;

    protected get status(): OfferVisibilityStatusAffiliateAccessEnum {
        return this.prepare.status;
    }

    protected get visibilityRequestLast(): OfferVisibilityRequestsModel {
        const requests = this.visibility?.requests
            .map((item) => ({
                ...item,
                id: +item.id,
                status: +item.status
            }))
            .sort((a, b) => b.id - a.id);

        return ArrayUtil.first(requests);
    }

    protected visibilityRequestStatus(status: OfferVisibilityRequestStatusIdEnum): OfferVisibilityRequestsModel {
        return this.visibility?.requests.find((item) => +item?.status === +status);
    }

    private get prepare(): OfferVisibilityAffiliateAccessStatusModel {
        // this.visibility?.availability === OfferRequestAvailabilityEnum.Approved
        if (
            this.firstVisibilityId === OffersVisibilityIdEnum.Public ||
            (this.firstVisibilityId === OffersVisibilityIdEnum.Private && this.visibility?.availability === OfferRequestStatusEnum.Approved)
        ) {
            return {
                color: ScaleoStatusColorEnum.Green,
                status: OfferVisibilityStatusAffiliateAccessEnum.Available
            };
        }

        if (this.visibility.id === OffersVisibilityIdEnum.Require) {
            if (this.visibility.availability) {
                return this.availability();
            }

            if (!this.visibility.availability && this.visibilityRequestLast?.status === OfferVisibilityRequestStatusIdEnum.Rejected) {
                return this.offerAccessStatusRequire;
            }

            if (this.visibilityRequests.length && +this.visibilityRequestLast?.status !== OfferVisibilityRequestStatusIdEnum.Active) {
                return this.requests();
            }
        }
        return this.offerAccessStatusRequire;
    }

    private get offerAccessStatusRequire(): OfferVisibilityAffiliateAccessStatusModel {
        return {
            color: ScaleoStatusColorEnum.Orange,
            status: OfferVisibilityStatusAffiliateAccessEnum.Require
        };
    }

    private get visibility(): OfferVisibilityModel {
        if (typeof this._visibility === 'object' || Array.isArray(this._visibility)) {
            if (Array.isArray(this._visibility)) {
                return ArrayUtil.first(this._visibility);
            }

            if (typeof this._visibility === 'object' && !Array.isArray(this._visibility)) {
                return this._visibility;
            }
        }

        return undefined;
    }

    private get firstVisibilityId(): OffersVisibilityIdEnum {
        return this.visibility?.id;
    }

    private get visibilityRequests(): OfferVisibilityRequestsModel[] {
        return this.visibility?.requests;
    }

    private availability(): OfferVisibilityAffiliateAccessStatusModel {
        const availability = this.visibility?.availability;

        const statusMap = {
            [OfferRequestStatusEnum.Approved]: {
                color: ScaleoStatusColorEnum.Green,
                status: OfferVisibilityStatusAffiliateAccessEnum.Available
            },
            [OfferRequestStatusEnum.Rejected]: {
                color: ScaleoStatusColorEnum.Red,
                status: OfferVisibilityStatusAffiliateAccessEnum.Rejected
            }
        };

        return {
            color: statusMap?.[availability]?.color,
            status: statusMap?.[availability]?.status
        };
    }

    private requests(): OfferVisibilityAffiliateAccessStatusModel {
        const status = +this.visibilityRequestLast.status;

        const statusMap: BaseObjectModel = {
            [OfferVisibilityRequestStatusIdEnum.Pending]: {
                color: ScaleoStatusColorEnum.Orange,
                status: OfferVisibilityStatusAffiliateAccessEnum.RequestRequire
            },
            [OfferVisibilityRequestStatusIdEnum.Rejected]: {
                color: ScaleoStatusColorEnum.Red,
                status: OfferVisibilityStatusAffiliateAccessEnum.RequestRejected
            },
            [OfferVisibilityRequestStatusIdEnum.Active]: {
                color: ScaleoStatusColorEnum.Green,
                status: OfferVisibilityStatusAffiliateAccessEnum.RequestApproved
            }
        };

        return {
            color: statusMap?.[status]?.color,
            status: statusMap?.[status]?.status
        };
    }
}
