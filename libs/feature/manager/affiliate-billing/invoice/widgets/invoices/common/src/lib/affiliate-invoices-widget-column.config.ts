import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const COLUMNS: UiSimpleTableHeaderModel[] = [
    {
        value: 'invoice_number',
        translateSchema: 'table.column.invoice_number',
        width: '20%'
    },
    {
        value: 'payment_method',
        translateSchema: 'table.column.payment_method',
        width: '25%'
    },
    {
        value: 'status',
        translateSchema: 'table.column.status'
    },
    {
        value: 'amount',
        translateSchema: 'table.column.amount'
    },
    {
        value: 'period',
        translateSchema: 'table.column.period'
    },
    {
        value: '',
        translateSchema: ''
    }
];

export const affiliateInvoicesWidgetColumns = getConfig<UiSimpleTableHeaderModel[]>(COLUMNS);
