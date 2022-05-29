import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN,
    BillingPreferencesFieldEnum,
    BillingPreferencesViewFieldOptionsModel,
    BillingPreferencesViewModule
} from '@scaleo/affiliate-billing/preferences/filds-view';
import { SharedModule } from '@scaleo/core/shared/module';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingPreferencesComponent } from './affiliate-billing-preferences.component';

@NgModule({
    declarations: [AffiliateBillingPreferencesComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule, DetailInfoModule, BillingPreferencesViewModule],
    exports: [AffiliateBillingPreferencesComponent],
    providers: [
        {
            provide: BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN,
            useFactory: (settingsQuery: PlatformSettingsQuery) => {
                const condition = settingsQuery.settings.invoice_type !== AffiliateInvoiceFrequencyEnum.ByAffiliateRequest;

                const defaultOptions: BillingPreferencesViewFieldOptionsModel = {
                    conditions: {
                        [BillingPreferencesFieldEnum.Frequency]: condition,
                        [BillingPreferencesFieldEnum.GenerationInvoice]: condition
                    }
                };

                return defaultOptions;
            },
            deps: [PlatformSettingsQuery]
        }
    ]
})
export class AffiliateAccessBillingPreferencesModule {}
