import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { OfferVisibilityModel } from '@scaleo/offer/common';
import { OfferListModel, OfferListQueryParamsDto, OfferListQueryParamsModel } from '@scaleo/offer/offers-list/data-access';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';

export interface ManagerOfferListQueryParamsDto extends OfferListQueryParamsDto {
    advertisers: string;
    visible_type: string;
    onlyFeatured: 'yes' | undefined;
}

export interface ManagerOfferListQueryParamsModel extends OfferListQueryParamsModel {
    advertisers: number[];
    visible_type: number[];
    onlyFeatured: 'yes' | undefined;
}

export class ManagerOfferListModel extends OfferListModel {
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
