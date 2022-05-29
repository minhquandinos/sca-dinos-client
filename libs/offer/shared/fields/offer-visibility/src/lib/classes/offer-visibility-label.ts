import { BaseObjectModel } from '@scaleo/core/data';
import { OfferVisibilityModel, OfferVisibilityRequestStatusIdEnum } from '@scaleo/offer/common';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { StatusesName } from '@scaleo/ui-kit/elements';

import { OfferVisibilityModeType } from '../offer-visibility.model';

export class OfferVisibilityLabel {
    label: string;

    private visibilityId: number;

    private labelForManagerMap: BaseObjectModel = {
        [OffersVisibilityIdEnum.Public]: 'statuses.public',
        [OffersVisibilityIdEnum.Private]: 'statuses.private',
        [OffersVisibilityIdEnum.Require]: 'statuses.require'
    };

    private labelForAffiliateMap: BaseObjectModel = {
        [OffersVisibilityIdEnum.Public]: 'visibility_types.available',
        [OffersVisibilityIdEnum.Private]: 'visibility_types.available',
        [OffersVisibilityIdEnum.Require]: 'statuses.require'
    };

    private labelRequestForAffiliateMap: BaseObjectModel = {
        [OfferVisibilityRequestStatusIdEnum.Active]: `statuses.${StatusesName.Approved}`,
        [OfferVisibilityRequestStatusIdEnum.Rejected]: `statuses.${StatusesName.Rejected}`,
        [OfferVisibilityRequestStatusIdEnum.Pending]: `statuses.${StatusesName.RequireApproval}`
    };

    constructor(
        private visibility: number | OfferVisibilityModel | OfferVisibilityModel[],
        private readonly mode: OfferVisibilityModeType
    ) {
        this.initLabel();
    }

    private initLabel() {
        this.setVisibilityId();
        this.setLabelByUserRole();
    }

    private setLabelByUserRole() {
        switch (this.mode) {
            case 'affiliate':
                this.label = this.affiliateLabel();
                break;
            default:
                this.label = this.managerLabel();
                break;
        }
    }

    private managerLabel(): string {
        const label = this.labelForManagerMap[this.visibilityId];
        return label || undefined;
    }

    private affiliateLabel(): string {
        if (typeof this.visibility === 'number') {
            return this.labelForAffiliateMap[this.visibilityId];
        }

        const firstVisibility = Array.isArray(this.visibility) ? this.visibility[0] : this.visibility;

        if (firstVisibility.id === OffersVisibilityIdEnum.Public || firstVisibility.id === OffersVisibilityIdEnum.Private) {
            return this.labelForAffiliateMap[this.visibilityId];
        }

        if (firstVisibility.id === OffersVisibilityIdEnum.Require) {
            let firstRequest;
            if (firstVisibility.requests.length > 0) {
                [firstRequest] = firstVisibility.requests;
                return this.labelRequestForAffiliateMap[firstRequest.status];
            }

            return this.labelRequestForAffiliateMap[OfferVisibilityRequestStatusIdEnum.Pending];
        }

        return undefined;
    }

    private setVisibilityId() {
        if (Array.isArray(this.visibility)) {
            this.visibilityId = this.visibility[0].id;
        }

        if (typeof this.visibility === 'object' && !Array.isArray(this.visibility)) {
            this.visibilityId = this.visibility.id;
        }

        if (typeof this.visibility === 'number') {
            this.visibilityId = this.visibility;
        }
    }
}
