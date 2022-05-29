import { PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { OfferCreativeDto } from '@scaleo/offer/common';

export type ManagerOfferCreativeDto = OfferCreativeDto;

export interface ManagerOfferCreativeListQueryParamsDto
    extends PageRequestModel,
        StatusRequestModel,
        SortRequestModel,
        SearchRequestModel {}
