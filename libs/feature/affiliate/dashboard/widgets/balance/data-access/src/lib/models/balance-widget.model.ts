import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface BalanceInvoicesWidgetModel {
    balance: BalanceWidgetModel;
    'recent-invoices': RecentInvoiceModel[];
}

export interface BalanceWidgetModel {
    currency: CurrencyEnum;
    approved_balance: number;
    pending_balance: number;
    balance_due: number;
}

export interface RecentInvoiceModel {
    id: number;
    date: string;
    status: InvoiceStatusNameEnum;
    amount: {
        value: number;
        currency: CurrencyEnum;
    };
}
