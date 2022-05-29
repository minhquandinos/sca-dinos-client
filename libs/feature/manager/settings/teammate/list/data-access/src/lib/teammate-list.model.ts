import { ProfileApiStatusType } from '@scaleo/account/common';
import { BooleanEnum, PageRequestModel, SearchRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { RolePermissionListVisibilityEnum } from '@scaleo/feature/manager/settings/role/common';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';

export interface TeammateListModel {
    api_status: ProfileApiStatusType;
    email: string;
    firstname: string;
    id: number;
    image: string;
    lastname: string;
    role: {
        base_role: {
            value: BaseRoleType;
            label: string;
        };
        role: {
            value: DefaultRoleEnum;
            label: string;
        };
        visibility: {
            key: RolePermissionListVisibilityEnum;
            label: string;
        };
    };
    status: PlatformListsStatusesEnum.Active | PlatformListsStatusesEnum.Inactive;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    twoFA_enabled: BooleanEnum;
    users_count: number;
    visited: number;
}

export interface TeammateListQueryParamsModel extends PageRequestModel, SortRequestModel, StatusRequestModel, SearchRequestModel {
    type: 'all';
    role: DefaultRoleEnum | '';
}
