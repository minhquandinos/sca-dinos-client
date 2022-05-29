import { RoleExcludePermissionModel } from '../models/role-permission.model';

export interface RolePermissionInterface {
    _newPermission: string[];

    readonly excludePermission: RoleExcludePermissionModel;

    permissions: () => string[];
}
