import {
    BaseIdTitleModel,
    BooleanEnum,
    PageRequestModel,
    SearchRequestModel,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { OfferGoalCapModel } from '@scaleo/feature/manager/offer/goal/common';
import { GoalStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface OfferGoalListDto {
    id: number;
    title: string;
    status: number;
    is_default: number;
    type: BaseIdTitleModel;
    tracking_method: BaseIdTitleModel;
    tracking_domain: string;
    revenue: number;
    payout: number;
    conversion_status: number;
    is_private: number;
    multiple_conversions: number;
    currency: number;
    caps: OfferGoalCapModel[];
    alias: string;
    require_postback_token: BooleanEnum;
    postback_token: string;
}

export interface OfferGoalListQueryParamsDto
    extends PageRequestModel,
        SortRequestModel,
        StatusRequestModel<GoalStatusNameEnum>,
        SearchRequestModel {}
