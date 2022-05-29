import { InjectionToken, Provider } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';

export const BASE_TOP_COLUMN_TOKEN = new InjectionToken('BaseTopColumn');

export const BASE_TOP_COLUMN_FACTORY = <T extends BaseObjectModel = unknown>(config: T[], key: string): Provider => {
    return {
        provide: BASE_TOP_COLUMN_TOKEN,
        useFactory: (check: CheckPermissionService) => {
            return config
                .filter((column) => {
                    if (column.value === key) {
                        return check.check([PLATFORM_PERMISSIONS.canSeeRevenue, PLATFORM_PERMISSIONS.canSeePayout]);
                    }
                    return true;
                })
                .map((column) => {
                    if (column.value === key && !check.check(PLATFORM_PERMISSIONS.canSeeRevenue)) {
                        return {
                            ...column,
                            translateKey: 'table.column.payout'
                        };
                    }
                    return column;
                });
        },
        deps: [CheckPermissionService]
    };
};
