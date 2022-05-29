import { Expose } from 'class-transformer';

import { PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';

export interface DomainListDto {
    // AffiliateDomainInterface
    id: number;
    title: string;
    name: string;
    configuration: string;
    flag: number;
    status: number;
    affiliate_id: number;
    created: number;
    updated: number;
}

// AffiliateDomainInterface
export class DomainListModel {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    configuration: string;

    @Expose()
    status: number;
}

export interface DomainListQueryParamsDto extends PageRequestModel, SortRequestModel, StatusRequestModel {
    type?: 'all';
}

export interface DomainViewDto {
    id: number;
    title: string;
    name: string;
    configuration: string;
    flag: number;
    status: number;
    affiliate_id: number;
    created: number;
    updated: number;
}

export class DomainViewModel {
    @Expose()
    id: number;

    @Expose()
    affiliate_id: number;

    @Expose()
    name: string;

    @Expose()
    status: number;
}

export type DomainStatusType = PlatformListsStatusesEnum.Active | PlatformListsStatusesEnum.Inactive;

export interface DomainUpsertPayloadModel {
    affiliate_id: number;
    id: number;
    name: string;
    status: DomainStatusType;
}
