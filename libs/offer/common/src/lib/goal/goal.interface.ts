import { Expose, Transform } from 'class-transformer';
import { JsonObject, JsonProperty } from 'json2typescript';

import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import { PlatformConversionStatusValueType } from '@scaleo/platform/list/access-data';
import { Util } from '@scaleo/utils';

export interface GoalInterface {
    goal_id: number;
    goal_name: string;
    goal_type: number;
    goal_type_name: string;
    revenue: number;
    payout: number;
    tracking_method?: number;
    conversion_status?: PlatformConversionStatusValueType;
    multiple_conversions?: number;
    has_caps?: number;
    conversion_status_as_string?: string;
    label?: string;
    tracking_method_title?: string;
    tracking_code?: string;
    caps?: OfferGoalCapModel[];
    payout_for_affiliate?: string;
    currency?: string;
    alias?: string;
    is_default?: boolean;
}

abstract class GoalAbstractModel {
    @Expose()
    alias?: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.jsonParse(value, []), { toClassOnly: true })
    caps?: OfferGoalCapModel[] = undefined;

    @Expose()
    payout_for_affiliate?: string = undefined;

    @Expose()
    conversion_status?: number = undefined;

    @Expose()
    multiple_conversions?: number = undefined;

    @Expose()
    has_caps?: number = undefined;

    @Expose()
    tracking_method_title?: string = undefined;

    @Expose()
    tracking_code?: string = undefined;
}

export class GoalOfferModel extends GoalAbstractModel {
    @Expose()
    goal_id: number = undefined;

    @Expose()
    goal_name: string = undefined;

    @Expose()
    goal_type: number = undefined;

    @Expose()
    goal_type_name: string = undefined;

    @Expose()
    revenue?: string = undefined;

    @Expose()
    payout?: string = undefined;

    @Expose()
    is_default?: number = undefined;

    @Expose()
    get isDefault(): boolean {
        return Boolean(+this.is_default);
    }

    @Expose()
    tracking_method?: number = undefined;

    @Expose()
    conversion_status_as_string?: string = undefined;
}

@JsonObject('GoalViewModel')
export class GoalViewModel extends GoalAbstractModel {
    @JsonProperty('created', Number)
    created: number = undefined;

    @JsonProperty('description', String, true)
    description?: string = undefined;

    @JsonProperty('fire_affiliate_postback', Number)
    fire_affiliate_postback: number = undefined;

    @JsonProperty('id', Number)
    id: number = undefined;

    @JsonProperty('is_default', Number, true)
    is_default?: number = undefined;

    get isDefault(): boolean {
        return Boolean(this.is_default);
    }

    @JsonProperty('is_private', Number, true)
    is_private?: number = undefined;

    @JsonProperty('offer_id', Number)
    offer_id: number = undefined;

    @JsonProperty('revenue', String)
    revenue: string = undefined;

    @JsonProperty('payout', String)
    payout: string = undefined;

    @JsonProperty('status', Number)
    status: number = undefined;

    @JsonProperty('title', String, true)
    title?: string = undefined;

    @JsonProperty('tracking_method', Number)
    tracking_method: number = undefined;

    @JsonProperty('type', Number, true)
    type?: number = undefined;

    @JsonProperty('currency', String, true)
    currency?: string = undefined;

    @JsonProperty('unique_track_id', Number)
    unique_track_id: number = undefined;
}

export interface GoalShortInterface {
    id: number;
    title: string;
    type: number;
}
