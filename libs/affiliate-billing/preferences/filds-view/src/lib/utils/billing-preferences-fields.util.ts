import { BillingPreferencesFieldEnum } from '../enums/billing-preferences-field.enum';
import { BillingPreferencesFieldType } from '../types/billing-preferences-field.type';

export const billingPreferencesFields = (exclude?: BillingPreferencesFieldType[]): BillingPreferencesFieldType[] => {
    const all = [
        BillingPreferencesFieldEnum.Frequency,
        BillingPreferencesFieldEnum.GenerationInvoice,
        BillingPreferencesFieldEnum.PaymentTerms,
        BillingPreferencesFieldEnum.BeneficiaryName,
        BillingPreferencesFieldEnum.BeneficiaryAddress,
        BillingPreferencesFieldEnum.BillingEmail,
        BillingPreferencesFieldEnum.TaxId,
        BillingPreferencesFieldEnum.Vat
    ];

    if (exclude) {
        return all.filter((field) => !exclude.includes(field));
    }

    return all;
};
