import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { OfferVisibilityModel } from '@scaleo/offer/common';
import { OfferListModel, OfferListQueryParamsDto, OfferListQueryParamsModel } from '@scaleo/offer/offers-list/data-access';
import { OfferAvailabilityEnum, OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

type YesOrUndefinedType = 'yes' | undefined;

export interface AffiliateOfferListQueryParamsDto extends OfferListQueryParamsDto {
    availability: OfferAvailabilityEnum | '';
    onlyMine: YesOrUndefinedType;
    onlyFeatured: YesOrUndefinedType;
}

export interface AffiliateOfferListQueryParamsModel extends OfferListQueryParamsModel {
    availability: OfferAvailabilityEnum | '';
    onlyMine: YesOrUndefinedType;
    onlyFeatured: YesOrUndefinedType;
}

export class AffiliateOfferListModel extends OfferListModel {
    @Expose()
    get visibilityId(): OffersVisibilityIdEnum {
        return this.visible_type_selected?.[0]?.id;
    }

    @Expose()
    get isFeatured(): boolean {
        return this.is_featured === BooleanEnum.True;
    }

    @Expose()
    get firstVisibility(): OfferVisibilityModel {
        return this.visible_type_selected?.[0];
    }
}
