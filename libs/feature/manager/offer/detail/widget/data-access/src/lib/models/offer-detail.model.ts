import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { TimeZoneModel } from '@scaleo/platform/date/model';
import { ShortAdvertiserModel } from '@scaleo/shared/data-access/short-entity-list';

interface OfferCurrencyModel {
    code: string;
    title: string;
}

export interface OfferDetailViewModel {
    id: number;
    title: string;
    image: string;
    image_url: string;
    status: BaseIdTitleModel;
    advertiser: ShortAdvertiserModel;
    categories: BaseIdTitleModel[];
    tags: BaseIdTitleModel[];
    traffic_types: BaseIdTitleModel[];
    description: string;
    internal_info: string;
    currency: OfferCurrencyModel;
    timezone: TimeZoneModel;
    expiration_date: string;
    is_expires: BooleanEnum;
    is_featured: BooleanEnum;
}

export interface OfferDetailViewDto {
    readonly id: number;
    readonly title: string;
    readonly image: string;
    readonly image_url: string;
    readonly status: BaseIdTitleModel;
    readonly advertiser: ShortAdvertiserModel;
    readonly categories: BaseIdTitleModel[];
    readonly tags: BaseIdTitleModel[];
    readonly traffic_types: BaseIdTitleModel[];
    readonly description: string;
    readonly internal_info: string;
    readonly currency: OfferCurrencyModel;
    readonly timezone: TimeZoneModel;
    readonly expiration_date: string;
    readonly is_expires: BooleanEnum;
    readonly is_featured: BooleanEnum;
}
