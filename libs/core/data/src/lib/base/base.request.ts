import { SortByType } from './all.type';
import { BaseObjectModel } from './base.model';

export interface PageRequestModel {
    page?: number;
    perPage?: number;
}

export interface ColumnsRequestModel {
    columns?: string;
}

export interface DateRangeRequestModel {
    rangeFrom?: string;
    rangeTo?: string;
}

export interface SortRequestModel {
    sortField?: string;
    sortDirection?: SortByType;
}

export interface StatusRequestModel<S = string | number> {
    status?: S;
}

export interface SearchRequestModel {
    search?: string;
}

export interface LangRequestModel {
    lang?: string;
}

export interface FiltersRequestModel<T extends BaseObjectModel<string, string> = any> {
    filters?: T;
}

export interface ExportFileFormatRequestModel<T = any> {
    format: T;
}

export interface BaseRequestModel<T = unknown, U = unknown> {
    params?: T;
    payload?: U;
}

export interface ExactRequestModel<T = 'id' | string> {
    exact?: T;
}
