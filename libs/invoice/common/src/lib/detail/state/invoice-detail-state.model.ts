import { createBaseInitialState } from '@scaleo/core/state/state';

import { InvoiceInfoModel } from '../models/invoice-info.model';
import { InvoiceTransactionModel } from '../models/invoice-transaction.model';

export interface InvoiceDetailState {
    info: InvoiceInfoModel;
    transaction: InvoiceTransactionModel;
}

export const initialInvoiceDetailState = createBaseInitialState({
    info: undefined,
    transaction: undefined
});
