import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { DetailInfoModule } from '@scaleo/ui-kit/elements';

import { BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN, BillingPreferencesViewFieldOptionsModel } from './billing-preferences-view-config.model';
import { AffiliateBillingPreferencesViewComponent } from './components/affiliate-billing-preferences-view/affiliate-billing-preferences-view.component';
import { AffiliateBillingInvoiceGenerationComponent } from './components/affiliate-billing-preferences-view/components/affiliate-billing-invoice-generation/affiliate-billing-invoice-generation.component';
import { AffiliateBillingInvoiceGenerationNamePipe } from './components/affiliate-billing-preferences-view/components/affiliate-billing-invoice-generation/pipes/affiliate-billing-invoice-generation-name.pipe';
import { InvoiceFrequencyViewComponent } from './components/affiliate-billing-preferences-view/components/invoice-frequency-view/invoice-frequency-view.component';
import { BillingPreferencesFieldEnum } from './enums/billing-preferences-field.enum';

@NgModule({
    declarations: [
        AffiliateBillingPreferencesViewComponent,
        AffiliateBillingInvoiceGenerationNamePipe,
        AffiliateBillingInvoiceGenerationComponent,
        InvoiceFrequencyViewComponent
    ],
    imports: [CommonModule, DetailInfoModule, PlatformFormatPipeModule, SharedModule],
    exports: [AffiliateBillingPreferencesViewComponent, InvoiceFrequencyViewComponent]
})
export class BillingPreferencesViewModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: BillingPreferencesViewModule,
            providers: [
                {
                    provide: BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN,
                    useFactory: (settingsQuery: PlatformSettingsQuery) => {
                        const condition = settingsQuery.settings.invoice_type !== AffiliateInvoiceFrequencyEnum.ByAffiliateRequest;

                        const defaultOptions: BillingPreferencesViewFieldOptionsModel = {
                            conditions: {
                                [BillingPreferencesFieldEnum.Frequency]: condition,
                                [BillingPreferencesFieldEnum.GenerationInvoice]: true
                            }
                        };

                        return defaultOptions;
                    },
                    deps: [PlatformSettingsQuery]
                }
            ]
        };
    }
}
