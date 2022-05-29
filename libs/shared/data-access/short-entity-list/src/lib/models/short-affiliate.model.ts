import {ExactRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel} from '@scaleo/core/data';

export interface ShortAffiliateDto {
    company: string;
    firstname: string;
    id: number;
    lastname: string;
}

export interface ShortAffiliateModel {
    id: number;
    title: string;
}

export interface ShortAffiliateConfigModel {
    queryParams: PageRequestModel & SortRequestModel & SearchRequestModel & ExactRequestModel;
}
