import { BooleanEnum } from '@scaleo/core/data';
import { BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';

export interface PermissionUpsertViewModel {
    // id: number;
    title: string;
    description: boolean;
    // visibility: PermissionUserVisibilityEnum;
    role: string;
}

export interface PermissionUpsertConfigureGroupModel extends Omit<PermissionUpsertConfigureItemModel, 'slug'> {
    key: string;
    items: PermissionUpsertConfigureItemModel[];
}

export interface PermissionUpsertConfigureItemModel {
    id: number;
    title: string;
    is_enabled: boolean;
    key: string;
    items: PermissionUpsertConfigureItemModel[];
}

export interface PermissionUpsertRoleModel {
    role: string;
    label: string;
}

export interface RolePermissionUpsertGroupsPayloadDto {
    group_id: number;
    ids: number[];
}

export interface RolePermissionCreatePayloadDto {
    title: string;
    base_role: BaseRoleType;
    groups: RolePermissionUpsertGroupsPayloadDto[];
}

export interface RolePermissionUpdatePayloadDto extends Omit<RolePermissionCreatePayloadDto, 'base_role'> {
    role: string;
}

interface PermissionFormControlGroupItemModel {
    id?: number;
    group_id: number;
    item: BooleanEnum | number;
}

export interface PermissionFormControlGroupsModel {
    items: PermissionFormControlGroupItemModel[];
}

export interface PermissionFormControlModel {
    title: string;
    role: string;
    groups: PermissionFormControlGroupsModel[];
}

export const PERMISSION_FORM_CONTROL = {
    title: 'title',
    role: 'role',
    groups: 'groups'
} as const;

export const PERMISSION_FORM_CONTROL_GROUP = {
    items: 'items'
} as const;

export const PERMISSION_FORM_CONTROL_ITEM = {
    group: 'group_id',
    item: 'item',
    id: 'id'
} as const;

export type PermissionUpsertPayloadOptionsType = Partial<{
    allowedCustomRole: boolean;
}>;

export interface RolePermissionUpsertConfigModel {
    role: DefaultRoleEnum;
    base_role: BaseRoleType;
    title: string;
}
