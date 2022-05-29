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
        value: 'properties',
        translate: 'table.column.properties',
        colWidth: '9.6%',
        sort: false
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

export const advertiserOfferListTableColumns = getConfig(columns);
