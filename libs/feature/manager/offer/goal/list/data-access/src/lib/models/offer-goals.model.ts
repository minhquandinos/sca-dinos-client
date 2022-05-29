import { Expose, Transform } from 'class-transformer';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { GoalStatusIdEnum, PlatformConversionStatusValueType } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export class OfferGoalListModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    status: GoalStatusIdEnum = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(value), { toClassOnly: true })
    is_default: boolean = undefined; // 1,

    @Expose()
    type: BaseIdTitleModel = undefined;

    @Expose()
    tracking_method: BaseIdTitleModel = undefined;

    @Expose()
    tracking_domain: string = undefined;

    @Expose()
    revenue: number = undefined;

    @Expose()
    payout: number = undefined;

    @Expose()
    conversion_status: PlatformConversionStatusValueType = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(value), { toClassOnly: true })
    is_private: boolean = undefined; // 0,

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(value), { toClassOnly: true })
    multiple_conversions: boolean = undefined; // 0,

    @Expose()
    currency: CurrencyEnum = undefined;

    @Expose()
    caps: any[] = [];

    @Expose()
    alias: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.numToBoolean(value), { toClassOnly: true })
    require_postback_token = false;

    @Expose()
    postback_token: string = undefined;
}
