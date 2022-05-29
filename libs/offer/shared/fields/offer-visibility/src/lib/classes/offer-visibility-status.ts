import { BaseObjectModel } from '@scaleo/core/data';
import { OfferVisibilityModel, OfferVisibilityRequestStatusIdEnum } from '@scaleo/offer/common';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { StatusesName } from '@scaleo/ui-kit/elements';

import { OfferVisibilityModeType } from '../offer-visibility.model';

const requestStatusMap: BaseObjectModel = {
    [OfferVisibilityRequestStatusIdEnum.Active]: StatusesName.Approved,
    [OfferVisibilityRequestStatusIdEnum.Rejected]: StatusesName.Rejected,
    [OfferVisibilityRequestStatusIdEnum.Pending]: StatusesName.RequireApproval
};

const visibilityStatusMap: BaseObjectModel = {
    [OffersVisibilityIdEnum.Public]: StatusesName.Approved,
    [OffersVisibilityIdEnum.Private]: StatusesName.Approved
};

export class OfferVisibilityStatus {
    status: StatusesName = undefined;

    private _visibility: OfferVisibilityModel;

    constructor(
        private visibility: number | OfferVisibilityModel | OfferVisibilityModel[],
        private readonly mode: OfferVisibilityModeType
    ) {
        this.initStatus();
    }

    private setStatus(): StatusesName {
        if (this.mode === 'affiliate') {
            const status = this.getOfferStatus();
            return status.status;
        }

        return undefined;
    }

    private initStatus(): void {
        if (typeof this.visibility === 'object' || Array.isArray(this.visibility)) {
            if (Array.isArray(this.visibility)) {
                const [first] = this.visibility;
                this._visibility = first;
            }

            if (typeof this.visibility === 'object' && !Array.isArray(this.visibility)) {
                this._visibility = this.visibility;
            }

            this.status = this.setStatus();
        }
    }

    private getOfferStatus(): {
        status: StatusesName;
        id: OfferVisibilityRequestStatusIdEnum | OffersVisibilityIdEnum;
    } {
        if (typeof this.visibility === 'number') {
            return {
                status: visibilityStatusMap[this.visibility],
                id: this.visibility
            };
        }

        const firstVisibility = Array.isArray(this.visibility) ? this.visibility[0] : this.visibility;

        if (firstVisibility.id === OffersVisibilityIdEnum.Public || firstVisibility.id === OffersVisibilityIdEnum.Private) {
            return {
                status: visibilityStatusMap[firstVisibility.id],
                id: firstVisibility.id
            };
        }

        if (firstVisibility.id === OffersVisibilityIdEnum.Require) {
            let firstRequest;
            if (firstVisibility.requests.length > 0) {
                [firstRequest] = firstVisibility.requests;
                return {
                    status: requestStatusMap[firstRequest.status],
                    id: firstRequest.status
                };
            }
            return {
                status: requestStatusMap[OfferVisibilityRequestStatusIdEnum.Pending],
                id: OfferVisibilityRequestStatusIdEnum.Pending
            };
        }

        return {
            status: null,
            id: null
        };
    }
}
