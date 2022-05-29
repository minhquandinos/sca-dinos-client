import { BillingPreferencesFieldEnum } from '../enums/billing-preferences-field.enum';

export type BillingPreferencesFieldType = keyof Record<BillingPreferencesFieldEnum, string>;
