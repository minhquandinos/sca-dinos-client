import { Expose, Transform } from 'class-transformer';

import { PostbackInterface } from '@scaleo/affiliate/postback/list/data-access';
import {
    BaseObjectModel,
    ColumnsRequestModel,
    ExportFileFormatRequestModel,
    LangRequestModel,
    PageRequestModel,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { GoalOfferModel, OfferVisibilityModel } from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { ShortAdvertiserModel } from '@scaleo/shared/data-access/short-entity-list';
import { Util } from '@scaleo/utils';

import { OfferTargetingGeoModel } from './index';
import {
    ExtendedTargetingInterface,
    OfferCreativeInterface,
    OfferUrlsInterface,
    TrackingDomainsInterface,
    YesEnum
} from './offer.interface';
import { OfferCustomParametersInterface } from './offer-custom-parameters.interface';

export abstract class BaseOfferModel {
    @Expose()
    id: number = undefined;

    @Expose()
    status?: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    private tags_selected?: BaseObjectModel[] = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    goals: GoalOfferModel[] = [];

    @Expose()
    links?: OfferUrlsInterface[] = [];

    @Expose()
    image: string = undefined;

    @Expose()
    currency: CurrencyEnum = undefined;

    @Expose()
    targeting: OfferTargetingGeoModel = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    extended_targeting?: ExtendedTargetingInterface[] = undefined;

    @Expose()
    is_featured: number = undefined;
}

export class OfferViewModel extends BaseOfferModel {
    @Expose()
    image_preview?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    tracking_domain?: TrackingDomainsInterface = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    traffic_types_selected?: BaseObjectModel[] = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    postbacks?: PostbackInterface[] = undefined;

    @Expose()
    advertiser?: ShortAdvertiserModel = undefined;

    @Expose()
    custom_trafficback_url?: string = undefined;

    @Expose()
    creatives?: OfferCreativeInterface[] = [];

    @Expose()
    @Transform(({ value }) => (value ? value.split(',').map((tag: any) => tag) : []), { toClassOnly: true })
    tags?: string[] = undefined;

    @Expose()
    timezone: string = undefined;

    @Expose()
    status_name?: string = undefined;

    @Expose()
    fail_traffic_forwarding?: number = undefined;

    @Expose()
    currency_name?: string = undefined;

    @Expose()
    timezone_name?: string = undefined;

    @Expose()
    fail_traffic_forwarding_name?: string = undefined;

    @Expose()
    custom_params?: OfferCustomParametersInterface[] = [];

    @Expose()
    unique_ips?: number = undefined;

    @Expose()
    hide_referer_url?: number = undefined;

    @Expose()
    postback_password?: string = undefined;

    @Expose()
    visible_type: OffersVisibilityIdEnum = undefined;

    @Expose()
    visible_type_selected: OfferVisibilityModel[] = [];

    @Expose()
    deep_linking: number = undefined;

    @Expose()
    description?: string = undefined;

    @Expose()
    advertiser_id?: number = undefined;

    @Expose()
    internal_info?: string = undefined;

    @Expose()
    expiration_date?: string = undefined;

    @Expose()
    is_expires?: number = undefined;

    @Expose()
    questions?: string = undefined;

    @Expose()
    ask_approval_questions?: number = undefined;
}

// @JsonObject('OffersModel')
// export class OffersModel extends AbstractOfferModel {
//     @JsonProperty('adv_cr', String, true)
//     adv_cr?: string = undefined;
//
//     @JsonProperty('advertiser', String, true)
//     private _advertiser?: string = undefined;
//
//     get advertiser(): ShortAdvertiserModel {
//         return Util.jsonParse(this._advertiser);
//     }
//
//     @JsonProperty('aff_epc', String, true)
//     aff_epc?: string = undefined;
//
//     @JsonProperty('affiliates_count', Number, true)
//     affiliates_count?: number = undefined;
//
//     @JsonProperty('change_conversion_amount_via_postback', Number, true)
//     change_conversion_amount_via_postback?: number = undefined;
//
//     @JsonProperty('change_conversion_status_via_postback', Number, true)
//     change_conversion_status_via_postback?: number = undefined;
//
//     @JsonProperty('cpc', String, true)
//     cpc?: string = undefined;
//
//     @JsonProperty('cr', String, true)
//     cr?: string = undefined;
//
//     @JsonProperty('ar', String, true)
//     ar?: string = undefined;
//
//     @JsonProperty('creatives_count', Number)
//     creatives_count: number = undefined;
//
//     @JsonProperty('custom_trafficback_url', String, true)
//     custom_trafficback_url?: string = undefined;
//
//     @JsonProperty('epc', String, true)
//     epc?: string = undefined;
//
//     @JsonProperty('links_count', Number)
//     links_count: number = undefined;
//
//     @JsonProperty('visible_type', Number, true)
//     visible_type?: OffersVisibilityIdEnum = undefined;
//
//     @JsonProperty('visible_type_selected', Any, true)
//     visible_type_selected: OfferVisibilityModel[] = [];
//
//     get visibilityId(): OffersVisibilityIdEnum {
//         return this.visible_type_selected[0].id;
//     }
//
//     get isFeatured(): boolean {
//         return this.is_featured === BooleanEnum.True;
//     }
//
//     get firstVisibility(): OfferVisibilityModel {
//         return this.visible_type_selected[0];
//     }
//
//     @JsonProperty('live_stats')
//     live_stats: TableConversionLiveStatsModel = undefined;
// }

// export interface OfferFiltersModel {
//     params: OfferQueryParams;
//     payload: PostFiltersInterface;
// }

/*
 * @Deprecated
 * */
export interface OfferQueryParams extends PageRequestModel, SortRequestModel, StatusRequestModel {
    goalsTypes?: string;
    tags?: string;
    countries?: string;
    advertisers?: string;
    visible_type?: string;
    onlyNew?: YesEnum;
}

/*
 * @Deprecated
 * */
export interface OffersExportParamsModel extends OfferQueryParams, LangRequestModel, ExportFileFormatRequestModel, ColumnsRequestModel {}
