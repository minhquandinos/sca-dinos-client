import { BaseShortEntityModel, ExactRequestModel, PageRequestModel, SearchRequestModel, SortRequestModel } from '@scaleo/core/data';

export type ShortOfferModel = BaseShortEntityModel;

export interface ShortOfferConfigModel {
    queryParams: PageRequestModel & SortRequestModel & SearchRequestModel & ExactRequestModel;
}
