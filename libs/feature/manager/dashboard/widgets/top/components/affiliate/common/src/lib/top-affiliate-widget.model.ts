import { BaseObjectModel } from '@scaleo/core/data';
import {
    BaseTopPayloadDto,
    BaseTopQueryParamsDto,
    BaseTopRequestType,
    BaseTopWidgetModel
} from '@scaleo/dashboard/shared/widgets/top/common';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

export interface WidgetTopAffiliateRowsModel extends BaseTopWidgetModel {
    affiliate: string;
}

export type TopAffiliatesConfigModel = UiTableHeaderInterface[];

type TopAffiliatesPayloadDto = BaseTopQueryParamsDto;

type TopAffiliatesQueryParamsDto = BaseTopPayloadDto<BaseObjectModel<'offers', string>>;

export type TopAffiliatesRequestDtoType = BaseTopRequestType<TopAffiliatesPayloadDto, TopAffiliatesQueryParamsDto>;

export const TOP_AFFILIATES_REVENUE_FIELD = 'value' as const;
