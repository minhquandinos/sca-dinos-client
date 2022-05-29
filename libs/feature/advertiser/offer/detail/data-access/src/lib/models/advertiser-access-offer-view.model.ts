import { Expose, Transform, Type } from 'class-transformer';

import { PostbackInterface } from '@scaleo/affiliate/postback/list/data-access';
import { BaseIdTitleModel, BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { AffiliateOfferCreativeModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import {
    ExtendedTargetingInterface,
    GoalOfferModel,
    OfferCreativeDto,
    OfferCreativeModel,
    OfferTargetingGeoModel,
    OfferUrlsInterface,
    OfferViewTargetingModel,
    OfferVisibilityModel,
    TrackingDomainsInterface
} from '@scaleo/offer/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { Util } from '@scaleo/utils';

export class AdvertiserAccessOfferViewModel {
    @Expose()
    aff_epc?: string = undefined;

    @Expose()
    ar?: string = undefined;

    @Expose()
    cr?: string = undefined;

    @Expose()
    ask_approval_questions?: number = undefined;

    @Expose()
    @Type(() => AffiliateOfferCreativeModel)
    creatives?: AffiliateOfferCreativeModel[] = [];

    @Expose()
    creatives_count = 0;

    @Expose()
    currency?: CurrencyEnum = undefined;

    @Expose()
    currency_name?: string = undefined;

    @Expose()
    deep_linking = 0;

    @Expose()
    description?: string = undefined;

    @Expose()
    epc?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    extended_targeting: ExtendedTargetingInterface[] = [];

    @Expose()
    @Type(() => GoalOfferModel)
    goals: GoalOfferModel[] = [];

    @Expose()
    gt_excluded_ids: string = undefined;

    @Expose()
    gt_included_ids: string = undefined;

    @Expose()
    id: number = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    is_featured: BooleanEnum = BooleanEnum.False;

    @Expose()
    @Type(() => OfferLandingPageModel)
    links?: OfferLandingPageModel[] = [];

    @Expose()
    links_count = 0;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    postbacks?: PostbackInterface[] = undefined;

    @Expose()
    questions?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    tags_selected?: BaseIdTitleModel[] = undefined;

    @Expose()
    targeting: OfferViewTargetingModel = undefined;

    @Expose()
    timezone: string = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    tracking_domain?: TrackingDomainsInterface = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    traffic_types_selected?: BaseObjectModel[] = undefined;

    @Expose()
    visible_type_selected: OfferVisibilityModel[] = [];

    @Expose()
    status: number = undefined;

    @Expose()
    internal_info = '';

    @Expose()
    is_expires: BooleanEnum = BooleanEnum.False;

    @Expose()
    expiration_date: number = undefined;
}

export interface AdvertiserAccessOfferViewDto {
    adv_cr: string;
    advertiser: string;
    advertiser_id: number;
    aff_epc: string;
    affiliates_count: number;
    ar: string;
    ask_approval_questions: number;
    change_conversion_amount_via_postback: number;
    change_conversion_status_via_postback: number;
    conversions: number;
    cookie_lifetime: number;
    cpc: string;
    cr: string;
    created: number;
    creatives: AdvertiserOfferCreativeModel[];
    creatives_count: number;
    currency: CurrencyEnum;
    custom_trafficback_url: string;
    deep_linking: number;
    default_goal_id: number;
    description: string;
    double_meta_redirect: number;
    epc: string;
    expiration_date: number;
    extended_targeting: string;
    external_id: string;
    fail_traffic_forwarding: number;
    goals: GoalOfferModel[];
    gt_excluded_ids: string;
    gt_filter_ids: string;
    gt_included_ids: string;
    hide_referer_url: number;
    id: number;
    image: string;
    impressions_url: string;
    internal_info: string;
    is_expires: number;
    is_featured: number;
    links: OfferUrlsInterface[];
    links_count: number;
    offers_to_forward: number;
    postback_blacklist_ips: string;
    postback_lifetime: number;
    postback_whitelist_ips: string;
    questions: string;
    show_sales_amount: number;
    status: number;
    strict_targeting: number;
    tags: string;
    tags_selected: string;
    targeting: OfferTargetingGeoModel;
    timezone: string;
    title: string;
    tracking_domain: string;
    tracking_domain_id: number;
    traffic_distribution_method: number;
    traffic_types: string;
    traffic_types_selected: string;
    unique_ips: number;
    unique_ips_time_span: number;
    updated: number;
    visible_type: string;
    visible_type_selected: OfferVisibilityModel[];
}

export class AdvertiserOfferCreativeModel extends OfferCreativeModel {
    @Expose()
    offer_id: number = undefined;

    @Expose()
    xml_feed_url_tag: string = undefined;

    @Expose()
    type: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    type_selected: BaseIdTitleModel[] = undefined;

    @Expose()
    offer_url_id: number = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value), { toClassOnly: true })
    offer_url_selected: AdvertiserOfferUrlModel = undefined;

    tracking_url: string;
}

export interface AdvertiserOfferCreativeDto extends Omit<OfferCreativeDto, 'type'> {
    offer_id: number;
    xml_feed_url_tag: '';
    type: number;
    type_selected: string;
    created: number;
    updated: number;
    offer_url_id: number;
    offer_url_selected: string;
}

export interface AdvertiserOfferUrlModel extends BaseIdTitleModel {
    url: string;
}
