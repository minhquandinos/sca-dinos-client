import { Expose, Transform } from 'class-transformer';

import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { OfferTargetingRuleModel } from '@scaleo/offer/common';
import { OfferLandingPageStatusIdEnum, OfferUrlsTypeIdEnum } from '@scaleo/platform/list/access-data';

export class OfferLandingPageUpsertFormControlModel {
    @Expose()
    title: string;

    @Expose()
    status: OfferLandingPageStatusIdEnum;

    @Expose()
    url: string;

    @Expose()
    preview: string;

    @Expose()
    visible_to_all_affiliates: BooleanEnum;

    @Expose()
    @Transform(({ value }) => (value as BaseIdTitleModel[])?.map((elem) => elem.id), { toClassOnly: true })
    visible_to_specific_affiliates_only: number[] = [];

    @Expose()
    @Transform(({ value }) => (value as BaseIdTitleModel[])?.map((elem) => elem.id), { toClassOnly: true })
    geo_allowed: number[] = [];

    @Expose()
    @Transform(({ value }) => (value as BaseIdTitleModel[])?.map((elem) => elem.id), { toClassOnly: true })
    geo_denied: number[] = [];

    @Expose()
    rules: OfferTargetingRuleModel[] = [];

    @Expose()
    type: BaseIdTitleModel<OfferUrlsTypeIdEnum> = undefined;

    @Expose()
    get isDefault(): boolean {
        return this.type.id === OfferUrlsTypeIdEnum.Default;
    }
}
