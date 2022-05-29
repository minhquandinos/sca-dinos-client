import { PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface ShortPaymentMethodDto {
    id: number;
    title: string;
}

export interface ShortPaymentMethodModel {
    id: number;
    title: string;
}

export interface ShortPaymentMethodConfigModel {
    queryParams: ShortPaymentMethodQueryParamDto;
}

export interface ShortPaymentMethodQueryParamDto extends PageRequestModel, SortRequestModel, SearchRequestModel {}
