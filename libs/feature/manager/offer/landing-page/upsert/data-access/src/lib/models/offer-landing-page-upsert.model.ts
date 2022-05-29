import { Expose, Transform, Type } from 'class-transformer';

import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { OfferTargetingGeoModel, OfferTargetingListModel, OfferTargetingRuleModel } from '@scaleo/offer/common';
import { OfferLandingPageStatusIdEnum, OfferUrlsTypeIdEnum, PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { ArrayUtil, Util } from '@scaleo/utils';

export interface OfferLandingPageUpsertDto {
    id: number;
    title: string;
    type: BaseIdTitleModel;
    url: string;
    preview: string;
    visible_to_all_affiliates: BooleanEnum;
    visible_to_specific_affiliates_only: BaseIdTitleModel[];
    targeting: OfferTargetingListModel;
    geo_allowed: OfferTargetingGeoModel[];
    geo_denied: OfferTargetingGeoModel[];
    rules: OfferTargetingRuleModel[];
}

export class OfferLandingPageUpsertModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    status: PlatformListsStatusesEnum = undefined;

    @Expose()
    type: BaseIdTitleModel<OfferUrlsTypeIdEnum> = undefined;

    @Expose()
    url: string = undefined;

    @Expose()
    preview: string = undefined;

    @Expose()
    visible_to_all_affiliates: BooleanEnum;

    @Expose()
    visible_to_specific_affiliates_only: BaseIdTitleModel[] = [];

    @Expose()
    @Type((): any => OfferTargetingListModel)
    targeting: OfferTargetingListModel;

    @Expose()
    geo_allowed: BaseIdTitleModel[] = [];

    @Expose()
    geo_denied: BaseIdTitleModel[] = [];

    @Expose()
    rules: OfferTargetingRuleModel[] = [];
}

export class OfferLandingPageUpsertPayloadDto {
    @Expose()
    title: string;

    @Expose()
    url: string;

    @Expose()
    preview: string;

    @Expose()
    visible_to_all_affiliates: BooleanEnum;

    @Transform(({ value }) => ArrayUtil.join(value), { toClassOnly: true })
    @Expose()
    visible_to_specific_affiliates_only: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value), { toClassOnly: true })
    geo_allowed: string;

    @Expose()
    @Transform(({ value }) => ArrayUtil.join(value), { toClassOnly: true })
    geo_denied: string;

    @Expose()
    @Transform(({ value }) => (!Util.isEmpty(value) ? Util.jsonStringify(value) : ''), { toClassOnly: true })
    rules: string;

    @Expose()
    status: OfferLandingPageStatusIdEnum;
}
