import { OfferVisibilityModel } from '@scaleo/offer/common';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

import { OfferVisibilityModeType } from '../offer-visibility.model';

export class OfferVisibilityIcon {
    icon: string;

    constructor(
        private visibility: number | OfferVisibilityModel | OfferVisibilityModel[],
        private readonly mode: OfferVisibilityModeType
    ) {
        this.initIcons();
    }

    private initIcons() {
        if (this.mode === 'manager') {
            switch (this.visibilityId) {
                case OffersVisibilityIdEnum.Public:
                    this.icon = 'offer_visibility_public';
                    break;
                case OffersVisibilityIdEnum.Require:
                    this.icon = 'offer_visibility_request';
                    break;
                case OffersVisibilityIdEnum.Private:
                    this.icon = 'offer_visibility_private';
                    break;
                default:
                    break;
            }
        }
    }

    private get visibilityId(): OffersVisibilityIdEnum {
        if (typeof this.visibility === 'object' && !Array.isArray(this.visibility)) {
            return this.visibility.id as OffersVisibilityIdEnum;
        }

        if (Array.isArray(this.visibility)) {
            return this.visibility[0].id as OffersVisibilityIdEnum;
        }

        return this.visibility as OffersVisibilityIdEnum;
    }
}
