import { UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const columns: UiSimpleTableHeaderModel[] = [
    {
        value: 'currency',
        translateSchema: 'table.column.currency'
    },
    {
        value: 'payment_method',
        translateSchema: 'table.column.payment_method'
    },
    {
        value: 'approved_balance',
        translateSchema: 'table.column.approved_balance'
    },
    {
        value: 'balance_due',
        translateSchema: 'table.column.balance_due'
    },
    {
        value: 'payment_request',
        translateSchema: 'table.column.payment_request'
    },
    {
        value: 'next_interval_date',
        translateSchema: 'table.column.next_interval_date',
        width: '25%'
    }
];

export const affiliatePaymentsMethodsColumnsConfig = getConfig<UiSimpleTableHeaderModel[]>(columns);
