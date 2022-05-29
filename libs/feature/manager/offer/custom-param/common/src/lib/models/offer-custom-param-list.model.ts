import { Expose } from 'class-transformer';

import {
    BaseIdTitleModel,
    BooleanEnum,
    PageRequestModel,
    ShortResponseInterface,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { CustomParamsActionIdEnum, CustomParamsTypesIdEnum, GoalTypeEnum } from '@scaleo/platform/list/access-data';

export class OfferCustomParamListModel {
    @Expose()
    id: number = undefined;

    @Expose()
    status: number = undefined;

    @Expose()
    affiliates_mixed: BooleanEnum = undefined;

    @Expose()
    affiliates: BaseIdTitleModel[] = undefined;

    @Expose()
    start_date: string = undefined;

    @Expose()
    end_date: string = undefined;

    @Expose()
    conditions: OfferCustomParametersConditionsModel[] = undefined;

    @Expose()
    parameters: OfferCustomParametersParametersModel[] = undefined;

    @Expose()
    created: number = undefined;

    @Expose()
    updated: number = undefined;
}

export interface OfferCustomParametersConditionsModel {
    type: number;
    permission: CustomParamsTypesIdEnum;
    conditions: string | BaseIdTitleModel[] | number[];
}

export interface OfferCustomParametersParametersModel {
    type: CustomParamsActionIdEnum;
    cap_type: number;
    goal_id: OfferCustomParametersParameterGoalIdModel;
    parameter: string | ShortResponseInterface;
}

interface OfferCustomParametersParameterGoalIdModel {
    id: number;
    title: string;
    type: GoalTypeEnum;
}
