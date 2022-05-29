import { InjectionToken } from '@angular/core';

import { BillingPreferencesFieldEnum } from './enums/billing-preferences-field.enum';

export interface BillingPreferencesViewFieldOptionsModel {
    conditions: {
        [BillingPreferencesFieldEnum.Frequency]: boolean;
        [BillingPreferencesFieldEnum.GenerationInvoice]: boolean;
    };
}

export const BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN = new InjectionToken<BillingPreferencesViewFieldOptionsModel>(
    'BillingPreferencesViewFieldOptions'
);
