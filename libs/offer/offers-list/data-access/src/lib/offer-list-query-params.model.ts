import { PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

export interface OfferListQueryParamsDto extends PageRequestModel, SortRequestModel, StatusRequestModel<string>, SearchRequestModel {
    countries: string;
    tags: string;
    goalsTypes: string;
}

export interface OfferListQueryParamsModel
    extends PageRequestModel,
        SortRequestModel,
        StatusRequestModel<PlatformListsStatusesNameEnum>,
        SearchRequestModel {
    countries: number[];
    tags: string[];
    goalsTypes: number[];
}
