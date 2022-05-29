import { BaseIdTitleModel, BooleanEnum, PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import {
    OfferCustomParametersConditionsModel,
    OfferCustomParametersParametersModel
} from '@scaleo/feature/manager/offer/custom-param/common';

export interface OfferCustomParamListDto {
    id: number;
    status: number;
    affiliates_mixed: BooleanEnum;
    affiliates: BaseIdTitleModel[];
    start_date: string;
    end_date: string;
    conditions: OfferCustomParametersConditionsModel[];
    parameters: OfferCustomParametersParametersModel[];
    created: number;
    updated: number;
}

export interface OfferCustomParamListQueryParamsDto extends PageRequestModel, SortRequestModel, StatusRequestModel {}
