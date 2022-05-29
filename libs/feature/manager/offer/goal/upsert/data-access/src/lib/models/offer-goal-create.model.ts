import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { GoalStatusIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferGoalUpsertDto {
    id: number;
    title: string;
    status: GoalStatusIdEnum;
    is_default: number;
    type: BaseIdTitleModel;
    tracking_method: BaseIdTitleModel;
    tracking_domain: string;
    revenue: number;
    payout: number;
    conversion_status: number;
    is_private: number;
    multiple_conversions: number;
    currency: CurrencyEnum;
    caps: OfferGoalCapModel[];
    alias: string;
    can_remove: BooleanEnum;
    postback_token: string | null;
}

export interface OfferGoalUpsertModel {
    id: number;
    title: string;
    status: GoalStatusIdEnum;
    is_default: boolean;
    type: BaseIdTitleModel;
    tracking_method: BaseIdTitleModel;
    tracking_domain: string;
    revenue: number;
    payout: number;
    conversion_status: number;
    is_private: number;
    multiple_conversions: number;
    currency: CurrencyEnum;
    caps: OfferGoalCapModel[];
    alias: string;
    can_remove: boolean;
    postback_token: string | null;
}

export interface OfferGoalUpsertPayloadDto extends Omit<OfferGoalUpsertDto, 'caps' | 'type' | 'tracking_method'> {
    caps: string;
    type: number;
    tracking_method: number;
}
