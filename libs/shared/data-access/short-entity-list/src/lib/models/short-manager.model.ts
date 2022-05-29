import { Expose } from 'class-transformer';

import { PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

export interface ShortManagerDto {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    image: string;
    role: string;
    users_count: number;
}

export class ShortManagerModel {
    @Expose()
    id: number = undefined;

    @Expose()
    email: string = undefined;

    @Expose()
    firstname: string = undefined;

    @Expose()
    lastname: string = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    role: DefaultRoleEnum = undefined;

    @Expose()
    users_count: number = undefined;

    @Expose()
    get title(): string {
        return `${this.firstname} ${this.lastname}`;
    }
}

export interface ShortManagerConfigModel {
    queryParams: ShortManagerQueryParamDto;
}

export interface ShortManagerQueryParamDto
    extends PageRequestModel,
        SortRequestModel,
        SearchRequestModel,
        StatusRequestModel<PlatformListsStatusesNameEnum.Active | PlatformListsStatusesNameEnum.Inactive> {
    exclude_role?: DefaultRoleEnum;
}
