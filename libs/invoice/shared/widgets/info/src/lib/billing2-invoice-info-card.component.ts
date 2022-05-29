import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AffiliateBillingPreferencesModel } from '@scaleo/affiliate-billing/preferences/data-access';
import { BillingPreferencesFieldEnum, billingPreferencesFields } from '@scaleo/affiliate-billing/preferences/filds-view';
import { InvoiceInfoModel } from '@scaleo/invoice/common';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'app-billing2-invoice-info-card',
    templateUrl: './billing2-invoice-info-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Billing2InvoiceInfoCardComponent implements OnChanges {
    @Input() data: InvoiceInfoModel;

    billingPreferences: Pick<
        AffiliateBillingPreferencesModel,
        'vat' | 'beneficiary_name' | 'beneficiary_address' | 'billing_email' | 'tax_id'
    >;

    billingPreferencesFields = billingPreferencesFields([
        BillingPreferencesFieldEnum.Frequency,
        BillingPreferencesFieldEnum.GenerationInvoice,
        BillingPreferencesFieldEnum.PaymentTerms
    ]);

    constructor(@Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType) {}

    ngOnChanges(changes: SimpleChanges) {
        const { data } = changes;
        if (data?.currentValue) {
            this.setBillingPreferences();
        }
    }

    private setBillingPreferences(): void {
        const { vat, beneficiary_name, beneficiary_address, billing_email, tax_id } = this.data;
        this.billingPreferences = {
            vat,
            beneficiary_name,
            beneficiary_address,
            billing_email,
            tax_id
        };
    }
}
