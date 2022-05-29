import { ExactRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface ShortAdvertiserModel {
    id: number;
    title: string;
}

export interface ShortAdvertiserDto {
    id: number;
    firstname: string;
    lastname: string;
    company?: string;
    company_name?: string;
    image?: string;
}

export interface ShortAdvertiserConfigModel {
    queryParams: PageRequestModel & SortRequestModel & SearchRequestModel & ExactRequestModel;
}
