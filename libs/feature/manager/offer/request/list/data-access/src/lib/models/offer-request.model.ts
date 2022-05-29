import { Expose } from 'class-transformer';

import {
    BaseIdTitleModel,
    PageRequestModel,
    SearchRequestModel,
    SortByType,
    SortRequestModel,
    StatusRequestModel
} from '@scaleo/core/data';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';

import { OfferRequestColumnSortEnum } from '../../../../component/src/lib/types/offer-request-columns.enum';

export interface OfferRequestQueryParamsDto extends PageRequestModel, SortRequestModel, StatusRequestModel, SearchRequestModel {
    statuses: string;
    offers: string;
    affiliates: string;
}

export interface OfferRequestQueryParamsModel {
    page: number;
    perPage: number;
    sortField: OfferRequestColumnSortEnum;
    sortDirection: SortByType;
    search: string;
    statuses: string[];
    offers: number[];
    affiliates: number[];
}

export interface OfferRequestActionModel {
    image: string;
    firstname: string;
    lastname: string;
}

export class OfferRequestModel {
    @Expose()
    id: number;

    @Expose()
    status: OfferRequestStatusEnum;

    @Expose()
    date: string;

    @Expose()
    offer: BaseIdTitleModel;

    @Expose()
    affiliate: BaseIdTitleModel;

    @Expose()
    fraud: number;

    @Expose()
    questions: string;

    @Expose()
    answer: string;

    @Expose()
    action: OfferRequestActionModel;
}

export interface OfferRequestSolveQueryParamsDto {
    ids: string;
    status: OfferRequestStatusEnum;
}
