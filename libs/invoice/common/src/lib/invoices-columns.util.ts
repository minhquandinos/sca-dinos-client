import { BaseObjectModel } from '@scaleo/core/data';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

export const setAffiliateInvoicesColumnsWidthUtil = (columns: UiTable2ColumnsModel[]): UiTable2ColumnsModel[] => {
    const columnWidthMap: BaseObjectModel = {
        invoice_number: '12rem',
        amount: '8rem',
        status: '6rem'
    };

    return columns.map((column) => ({
        ...column,
        colWidth: columnWidthMap[column.value] || 'auto'
    }));
};
