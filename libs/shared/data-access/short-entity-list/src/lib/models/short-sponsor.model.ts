import { ExactRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface ShortSponsorDto {
    id: number;
    firstname: string;
    lastname: string;
    company: string;
}

export interface ShortSponsorModel {
    id: number;
    title: string;
}

export interface ShortSponsorConfigModel {
    queryParams: ShortSponsorQueryParamDto;
}

export interface ShortSponsorQueryParamDto extends PageRequestModel, SortRequestModel, SearchRequestModel, ExactRequestModel {}
