import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

export const deliveryTableColumnsConfig: UiTable2ColumnsModel[] = [
    {
        value: 'title',
        translate: 'table.column.title',
        colWidth: '25%',
        sort: false
    },
    {
        value: 'campaign',
        translate: 'table.column.campaign',
        colWidth: '50%',
        sort: false
    },
    {
        value: 'notes',
        translate: 'table.column.notes',
        colWidth: '25%',
        sort: false
    }
];
