import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { OfferVisibilityModel } from '@scaleo/offer/common';
import { OfferListModel, OfferListQueryParamsDto, OfferListQueryParamsModel } from '@scaleo/offer/offers-list/data-access';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export type AffiliateOfferListQueryParamsDto = OfferListQueryParamsDto;

export type AffiliateOfferListQueryParamsModel = OfferListQueryParamsModel;

export class AdvertiserOfferListModel extends OfferListModel {
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
