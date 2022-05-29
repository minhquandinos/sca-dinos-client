import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const columns: UiTable2ColumnsModel[] = [
    {
        value: 'title',
        translate: 'table.column.title',
        colWidth: '20%'
    },
    {
        value: 'type',
        translate: 'table.column.type',
        colWidth: '8%'
    },
    {
        value: 'revenue',
        translate: 'table.column.revenue',
        colWidth: '8%'
    },
    {
        value: 'payout',
        translate: 'table.column.payout',
        colWidth: '9%'
    },
    {
        value: 'conversion_status',
        translate: 'table.column.initial_status',
        colWidth: '55px'
    },
    {
        value: 'hidden',
        translate: 'table.column.hidden',
        colWidth: '55px'
    },
    {
        value: 'multiple',
        translate: 'table.column.multiple',
        colWidth: '55px'
    },
    {
        value: 'caps',
        translate: 'table.column.caps',
        colWidth: '55px'
    },
    {
        value: 'postback',
        translate: 'table.column.postback',
        colWidth: '55px'
    }
];

export const offerGoalListColumnsWidgetConfig = getConfig<UiTable2ColumnsModel[]>(columns);
