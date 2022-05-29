import { Expose, Transform, Type } from 'class-transformer';

import { AffiliatePostbackListModel } from '@scaleo/affiliate/postback/list/data-access';
import { BaseIdTitleModel, BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
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
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export class AffiliateAccessOfferViewModel {
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
    @Transform(
        ({ value }) => {
            const postbacks = Util.jsonParse(value, []);

            return postbacks.map((elem: AffiliatePostbackListModel) => ({
                ...elem,
                offer_id: +elem?.offer_id || undefined,
                goal_id: +elem?.goal_id || undefined
            }));
        },
        { toClassOnly: true }
    )
    @Type(() => AffiliatePostbackListModel)
    postbacks?: AffiliatePostbackListModel[] = [];

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
}

export interface AffiliateAccessOfferViewDto {
    aff_epc: string;
    ar: string;
    ask_approval_questions: number;
    cr: string;
    creatives: AffiliateOfferCreativeModel[];
    creatives_count: number;
    currency: CurrencyEnum;
    deep_linking: number;
    description: string;
    epc: string;
    extended_targeting: string;
    goals: GoalOfferModel[];
    gt_excluded_ids: string;
    gt_included_ids: string;
    id: number;
    image: string;
    is_featured: BooleanEnum;
    links: OfferUrlsInterface[];
    links_count: number;
    postbacks: string;
    questions: string;
    tags: string;
    tags_selected: string;
    targeting: OfferTargetingGeoModel;
    timezone: string;
    title: string;
    tracking_domain: string;
    tracking_domain_id: number;
    traffic_types: string;
    traffic_types_selected: string;
    visible_type: OffersVisibilityIdEnum;
    visible_type_selected: OfferVisibilityModel[];
}

export class AffiliateOfferCreativeModel extends OfferCreativeModel {
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
    offer_url_selected: AffiliateOfferUrlModel = undefined;

    tracking_url: string;
}

export interface AffiliateOfferCreativeDto extends Omit<OfferCreativeDto, 'type'> {
    offer_id: number;
    xml_feed_url_tag: '';
    type: number;
    type_selected: string;
    created: number;
    updated: number;
    offer_url_id: number;
    offer_url_selected: string;
}

export interface AffiliateOfferUrlModel extends BaseIdTitleModel {
    url: string;
}
