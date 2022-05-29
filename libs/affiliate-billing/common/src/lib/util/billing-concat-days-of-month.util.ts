import { PaymentFrequencyIdEnum } from '@scaleo/platform/list/access-data';

export const billingConcatDaysOfMonthUtil = (invoiceFrequency: PaymentFrequencyIdEnum, firstDay: number, lastDay: number): string => {
    if (invoiceFrequency === PaymentFrequencyIdEnum.BiMonthly) {
        return [firstDay, lastDay].join(',');
    }
    return firstDay.toString();
};
