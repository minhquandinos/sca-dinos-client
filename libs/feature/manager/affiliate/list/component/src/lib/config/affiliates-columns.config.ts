import { InjectionToken, Provider } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

const columns: UiTable2ColumnsModel[] = [
    {
        value: 'id',
        translate: 'table.column.affiliate',
        colWidth: '28%',
        sort: true
    },
    {
        value: 'contacts',
        translate: 'table.column.contacts',
        colWidth: '17%',
        sort: false
    },
    {
        value: 'tags',
        translate: 'table.column.tags',
        colWidth: '13%',
        sort: false
    },
    {
        value: 'manager',
        translate: 'table.column.manager',
        sort: false
    },
    {
        value: 'created',
        translate: 'table.column.registration',
        colWidth: '9%',
        sort: true
    },
    {
        value: 'balance',
        translate: 'interface.basic.balance',
        colWidth: '6%',
        sort: true,
        tooltip: true,
        tooltipTranslate: 'affiliate.tooltip.table.balance.update'
    },
    {
        value: 'conversions',
        translate: 'table.column.conversions',
        colWidth: '145px',
        sort: true,
        tooltip: true,
        tooltipTranslate: 'offers_page.tooltip.table.conversions.info'
    }
];

export const MANAGER_AFFILIATE_LIST_COLUMNS_TOKEN = new InjectionToken<UiTable2ColumnsModel[]>('ManagerAffiliateListColumns');

export const MANAGER_AFFILIATE_LIST_COLUMNS_FACTORY: Provider = {
    provide: MANAGER_AFFILIATE_LIST_COLUMNS_TOKEN,
    useFactory: (checkPermissionService: CheckPermissionService): UiTable2ColumnsModel[] => {
        const columnMap: BaseObjectModel<string, boolean> = {
            balance: checkPermissionService.check(PLATFORM_PERMISSIONS.canAccessAffiliateBilling)
        };

        return columns.filter((column) => {
            const check = columnMap?.[column.value];
            return check !== undefined ? columnMap?.[column?.value] : true;
        });
    },
    deps: [CheckPermissionService]
};
