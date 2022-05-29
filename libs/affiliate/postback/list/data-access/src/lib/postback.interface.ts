import { BaseObjectModel, PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';

export interface PostbackInterface {
    id: number;
    level_id: number;
    level_name?: string;
    offer_id: number;
    offer_name?: string;
    offer_selected: BaseObjectModel;
    goal_id: number;
    goal_name?: string;
    goal_selected?: { [key: string]: string };
    conversion_status: number;
    type: number;
    type_name?: string;
    code: string;
    status: number;
    affiliate_id: number;
    created: number;
    updated: number;
}

export interface PostbacksCountsInterface {
    total: number;
    global: number;
}

export enum PostbackLevelsEnums {
    Global = 1,
    Offer = 2
}

export enum PostbackTypesEnums {
    Postback = 1,
    Pixel = 2
}
