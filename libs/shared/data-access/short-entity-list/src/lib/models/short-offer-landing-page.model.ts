import {
    BaseIdTitleModel,
    BooleanEnum,
    ExactRequestModel,
    PageRequestModel,
    SearchRequestModel,
    SortRequestModel
} from '@scaleo/core/data';

export interface ShortOfferLandingPageModel extends BaseIdTitleModel {
    is_default: BooleanEnum;
}

export interface ShortOfferLandingParamsModel
    extends SearchRequestModel,
        Pick<PageRequestModel, 'page'>,
        ExactRequestModel,
        SortRequestModel {}

export interface ShortOfferLandingConfigModel extends ShortOfferLandingParamsModel {
    offerId: number;
}
