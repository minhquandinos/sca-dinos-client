import { TOP_AFFILIATES_REVENUE_FIELD } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/common';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';
import { getConfig } from '@scaleo/utils';

const tableHeaders: UiTableHeaderInterface[] = [
    {
        value: 'affiliate',
        key: 'affiliate',
        translateKey: 'table.column.affiliate',
        colWidth: '62%'
    },
    {
        value: TOP_AFFILIATES_REVENUE_FIELD,
        key: 'total_revenue',
        translateKey: 'table.column.revenue',
        colWidth: '20%',
        textAlign: 'right',
        sort: true
    },
    {
        value: 'change',
        key: 'change',
        translateKey: 'table.column.change',
        colWidth: '18%',
        textAlign: 'right'
    }
];

export const topAffiliatesDefaultColumnsConfig = getConfig<UiTableHeaderInterface[]>(tableHeaders);
