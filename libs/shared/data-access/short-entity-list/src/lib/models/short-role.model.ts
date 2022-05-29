import { BaseRoleType } from '@scaleo/platform/role/models';

export interface ShortRoleDto {
    role: string;
    label: string;
}

export interface ShortRoleModel {
    role: string;
    label: string;
    base_role?: BaseRoleType;
}
