import { InjectionToken, Provider } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';
import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const columns: UiTable2ColumnsModel[] = [
    {
        value: 'id',
        translate: 'table.column.offer',
        colWidth: '30%',
        sort: true
    },
    {
        value: 'goals',
        translate: 'table.column.goals',
        colWidth: '11%',
        sort: false
    },
    {
        value: 'visible_type',
        translate: 'table.column.visibility',
        colWidth: '9.6%',
        sort: true
    },
    {
        value: 'targeting',
        translate: 'table.column.targeting',
        colWidth: '16%',
        sort: false
    },
    {
        value: 'tags',
        translate: 'table.column.tags',
        sort: false
    },
    {
        value: 'cr',
        translate: 'table.column.performance',
        colWidth: '10.5%',
        sort: true,
        tooltip: true,
        tooltipTranslate: 'offers_page.tooltip.table.performance.update'
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

export const offerListColumns = getConfig(columns);

export const OFFER_LIST_TABLE_COLUMNS_TOKEN = new InjectionToken<UiTable2ColumnsModel[]>('offersListTableColumns');

const columnsFactory = (checkPermissionService: CheckPermissionService): UiTable2ColumnsModel[] => {
    const columnMap: BaseObjectModel<string, boolean> = {
        visible_type: checkPermissionService.check(PLATFORM_PERMISSIONS.frontShowVisibleTypeOffers)
    };

    return offerListColumns.filter((column) => {
        const check = columnMap?.[column.value];
        return check !== undefined ? columnMap?.[column?.value] : true;
    });
};

export const MANAGER_OFFER_LIST_COLUMNS_FACTORY: Provider = {
    provide: OFFER_LIST_TABLE_COLUMNS_TOKEN,
    useFactory: columnsFactory,
    deps: [CheckPermissionService]
};
