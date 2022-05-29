import { DateRangeRequestModel, LangRequestModel, PageRequestModel, SortRequestModel } from '@scaleo/core/data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

export interface ManagerActivityLogListModel
    extends SortRequestModel,
        PageRequestModel,
        LangRequestModel,
        DateRangeRequestModel,
        ManagerActivityLogListEntityDto {
    // affiliate?: string;
    // offer?: string;
    // advertiser?: string;
    managers?: number[];
    role?: DefaultRoleEnum | string;
}

export interface ManagerActivityLogListDto
    extends SortRequestModel,
        PageRequestModel,
        LangRequestModel,
        DateRangeRequestModel,
        ManagerActivityLogListEntityDto {
    // affiliate?: string;
    // offer?: string;
    // advertiser?: string;
    managers?: string;
    role?: DefaultRoleEnum;
}

export enum ManagerActivityLogListEntityEnum {
    Affiliate = 'affiliate',
    Offer = 'offer',
    Advertiser = 'advertiser'
}

export interface ManagerActivityLogListEntityDto {
    [ManagerActivityLogListEntityEnum.Affiliate]?: number;
    [ManagerActivityLogListEntityEnum.Offer]?: number;
}

export enum ManagerActivityLogListDateRangePlaceEnum {
    FilterContainer = 'filterContainer',
    HeaderContainer = 'headerContainer'
}

export enum ManagerActivityLogListRouteDataEnum {
    CardHeaderTitle = 'cardHeaderTitle',
    DataRangePosition = 'dataRangePosition'
}
