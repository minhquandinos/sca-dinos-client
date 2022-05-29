import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const tableHeader: UiTableHeaderInterface[] = [
    {
        value: 'offer',
        translateKey: 'table.column.offer',
        colWidth: '62%'
    },
    {
        value: 'value',
        translateKey: 'table.column.revenue',
        colWidth: '20%',
        textAlign: 'right',
        sort: true
    },
    {
        value: 'change',
        translateKey: 'table.column.change',
        colWidth: '18%',
        textAlign: 'right'
    }
];

export const topOfferDefaultConfig = getConfig<UiTableHeaderInterface[]>(tableHeader);
