import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PlatformSettingsModel } from '@scaleo/platform/settings/access-data';

import { affiliatePaymentsMethodsColumnsConfig } from '../configs/affiliate-payments-methods-columns.config';

export const transformAffiliatePaymentsMethods = ({ invoice_type: type }: PlatformSettingsModel): any => {
    const paymentTypeByRequest: boolean = type === AffiliateInvoiceFrequencyEnum.ByAffiliateRequest;
    const ignoredColumns = paymentTypeByRequest ? ['balance_due', 'next_interval_date'] : ['payment_request'];
    return affiliatePaymentsMethodsColumnsConfig.filter((column) => !ignoredColumns.includes(column.value));
};
