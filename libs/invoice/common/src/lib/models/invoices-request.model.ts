import {
    ColumnsRequestModel,
    DateRangeRequestModel,
    LangRequestModel,
    PageRequestModel,
    SortByType,
    SortRequestModel
} from '@scaleo/core/data';

export enum InvoicesParamsEnum {
    Status = 'statuses',
    Affiliates = 'affiliates',
    PaymentsMethods = 'payments_methods',
    Currencies = 'currencies'
}

export interface InvoicesRequestModel extends PageRequestModel, ColumnsRequestModel, DateRangeRequestModel, SortRequestModel {
    [InvoicesParamsEnum.Status]?: string;
    [InvoicesParamsEnum.Affiliates]?: string;
    [InvoicesParamsEnum.PaymentsMethods]?: string;
    [InvoicesParamsEnum.Currencies]?: string;
}

export interface InvoicesParamsStateModel
    extends Omit<InvoicesRequestModel, 'affiliates' | 'payments_methods' | 'currencies' | 'statuses'> {
    columns: string;
    page: number;
    perPage: number;
    rangeFrom: string;
    rangeTo: string;
    [InvoicesParamsEnum.Status]: string[];
    sortField: string;
    sortDirection: SortByType;
    search?: string;
    [InvoicesParamsEnum.Affiliates]?: number[];
    [InvoicesParamsEnum.PaymentsMethods]?: number[];
    [InvoicesParamsEnum.Currencies]?: string[];
}

export interface Billing2InvoicesExportRequestModel extends Omit<InvoicesRequestModel, 'page' | 'perPage'>, LangRequestModel {
    lang?: string;
    format?: string;
    invoices?: string;
}
