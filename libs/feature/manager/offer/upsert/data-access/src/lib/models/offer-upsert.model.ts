import { Expose, Transform } from 'class-transformer';

import { BooleanEnum, ShortResponseInterface } from '@scaleo/core/data';
import { TimeZoneModel } from '@scaleo/platform/date/model';
import { ArrayUtil, Util } from '@scaleo/utils';

import { OffersVisibilityIdEnum } from '../../../../../../../../platform/list/access-data/src/lib/enums/platform-list';
import { GoalTypeEnum } from '../../../../../../../../platform/list/access-data/src/lib/enums/platform-list/goal-types.enum';
import { PlatformListsBaseInterface } from '../../../../../../../../platform/list/access-data/src/lib/models/platform.lists.interface';

export interface OfferFormDataDto {
    readonly advertiser_id: number;
    readonly categories: ShortResponseInterface[];
    readonly currency: PlatformListsBaseInterface;
    readonly description: string;
    readonly expiration_date: string;
    readonly id: number;
    readonly image: string;
    readonly internal_info: string;
    readonly is_featured: BooleanEnum;
    readonly status: ShortResponseInterface;
    readonly tags: ShortResponseInterface[];
    readonly timezone: TimeZoneModel;
    readonly title: string;
    readonly traffic_types: ShortResponseInterface[];
    readonly is_expires: BooleanEnum;
    readonly image_data: string;
    readonly visible_type?: OffersVisibilityIdEnum;
    readonly default_url?: string;
    readonly preview_url?: string;
    readonly goal_title?: string;
    readonly goal_type?: GoalTypeEnum;
    readonly goal_revenue?: string;
    readonly goal_payout?: string;
}

export class OfferPayloadModel {
    @Expose()
    id: number = undefined;

    @Expose()
    advertiser_id: number = undefined;

    @Expose()
    categories: ShortResponseInterface[] = undefined;

    @Expose()
    currency: PlatformListsBaseInterface = undefined;

    @Expose()
    @Transform(({ value }) => value || '', { toClassOnly: true })
    description: string = undefined;

    @Expose()
    expiration_date: string = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    internal_info: string = undefined;

    @Expose()
    is_featured: BooleanEnum = undefined;

    @Expose()
    status: ShortResponseInterface = undefined;

    @Expose()
    @Transform(({ value }) => (value ? ArrayUtil.join(value, ',', 'id') : ''), { toClassOnly: true })
    tags: string = undefined;

    @Expose()
    timezone: TimeZoneModel = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    @Transform(({ value }) => (value ? ArrayUtil.join(value, ',', 'id') : ''), { toClassOnly: true })
    traffic_types: string = undefined;

    @Expose()
    is_expires: BooleanEnum = undefined;

    @Expose()
    @Transform(({ value }) => Util.checkBase64Image(value), { toClassOnly: true })
    image_data: string = undefined;

    @Expose()
    visible_type: OffersVisibilityIdEnum = undefined;

    @Expose()
    default_url: string = undefined;

    @Expose()
    preview_url: string = undefined;

    @Expose()
    goal_title: string = undefined;

    @Expose()
    goal_type: GoalTypeEnum = undefined;

    @Expose()
    goal_revenue: string = undefined;

    @Expose()
    goal_payout: string = undefined;
}
