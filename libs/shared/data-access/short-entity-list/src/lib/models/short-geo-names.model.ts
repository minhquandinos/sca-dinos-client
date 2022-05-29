import { BaseIdTitleModel, LangRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface ShortGeoNameDto {
    id: number;
    title: string;
    country_code?: string;
    country_title?: string;
    region_code?: number;
    region_title?: string;
    selected?: boolean;
    disabled?: boolean;
    image?: string;
}

export interface ShortGeoNameModel extends BaseIdTitleModel {
    country_code: string;
    country_title: string;
    region_title: string;
}

export interface ShortGeoNameConfigModel {
    queryParams: ShortGeoNameQueryParamDto;
}

interface ShortGeoNameQueryParamDto extends LangRequestModel, PageRequestModel, SortRequestModel, SearchRequestModel {}
