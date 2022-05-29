import {
    BaseIdTitleModel,
    BooleanEnum,
    PageRequestModel,
    SearchRequestModel,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { OfferTargetingListModel } from '@scaleo/offer/common';
import { OfferLandingPageStatusIdEnum } from '@scaleo/platform/list/access-data';

export interface OfferLandingPageListDto {
    id: number;
    title: string;
    type: BaseIdTitleModel;
    url: string;
    preview: string;
    visible_to_all_affiliates: BooleanEnum;
    visible_to_specific_affiliates_only: BaseIdTitleModel[];
    targeting: OfferTargetingListModel;
    status: OfferLandingPageStatusIdEnum;
}

export interface OfferLandingPageListQueryParamsDto extends PageRequestModel, SortRequestModel, StatusRequestModel, SearchRequestModel {}
