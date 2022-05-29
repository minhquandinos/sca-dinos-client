import { BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';

export enum RolePermissionListVisibilityEnum {
    AllUser = 'visibility_all_users',
    AssignedUsersOnly = 'visibility_assigned_users'
}

export interface RolePermissionListModel {
    role: DefaultRoleEnum;
    base_role: BaseRoleType;
    label: string;
    visibility: {
        label: string;
        key: RolePermissionListVisibilityEnum;
    };
    parentRole?: {
        role: string;
    };
}
