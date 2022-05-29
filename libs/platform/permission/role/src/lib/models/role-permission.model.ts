export interface RoleExcludePermissionModel {
    [key: string]: {
        settingName: string;
        condition: unknown;
        permissionName: string;
    }[];
}
