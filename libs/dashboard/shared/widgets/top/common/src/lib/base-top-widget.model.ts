import {
    BaseObjectModel,
    BaseRequestModel,
    DateRangeRequestModel,
    FiltersRequestModel,
    PageRequestModel,
    SortRequestModel
} from '@scaleo/core/data';

export interface BaseTopWidgetModel {
    change: string;
    value: number;
    value_prev: number;
}

export interface BaseTopQueryParamsDto extends SortRequestModel, PageRequestModel, DateRangeRequestModel {
    preset: unknown;
}

export type BaseTopPayloadDto<T extends BaseObjectModel<string, string> = any> = FiltersRequestModel<T>;

export type BaseTopRequestType<Q = BaseTopQueryParamsDto, P = BaseTopPayloadDto> = BaseRequestModel<Q, P>;
