import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const columns: UiTable2ColumnsModel[] = [
    {
        value: 'id',
        translate: 'table.column.advertiser',
        colWidth: '30%',
        sort: true
    },
    {
        value: 'contacts',
        translate: 'table.column.contacts',
        colWidth: '18%',
        sort: false
    },
    {
        value: 'tags',
        translate: 'table.column.tags',
        colWidth: '14%',
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
        colWidth: '10%',
        sort: true
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

export const advertisersColumns = getConfig<UiTable2ColumnsModel[]>(columns);
