import { NgxPermissionsService } from 'ngx-permissions';

import { PermissionDataModel, PermissionMapDataType, PermissionsDataType } from './index';

export class PermissionData<D> {
    private _permissions: PermissionMapDataType;

    private _data: D[] = [];

    constructor(
        private readonly permissionsService: NgxPermissionsService,
        private readonly permissions: PermissionsDataType<PermissionDataModel>,
        private readonly data: D[],
        private readonly increment: keyof D
    ) {
        this._permissions = new Map<string, PermissionDataModel>(Object.entries(permissions));
        this._data = data;
    }

    get availableData(): D[] {
        return this.only().except().getTransformData();
    }

    private only(): this {
        this._data = this.prepare('only');
        return this;
    }

    private except(): this {
        this._data = this.prepare('except');
        return this;
    }

    private getTransformData(): D[] {
        return this._data;
    }

    private prepare(onlyOrExcept: keyof PermissionDataModel): D[] {
        return this._data.filter((elem) => {
            const key = elem?.[this.increment]?.toString();
            const permissions = this._permissions.get(key);
            if (!permissions) {
                return true;
            }
            const objPermissions = permissions?.[onlyOrExcept];
            return objPermissions ? objPermissions?.some((permission) => this.permissionsService.getPermission(permission)) : this._data;
        });
    }
}
