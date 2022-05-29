import { Expose } from 'class-transformer';

import { BaseIdTitleModel } from '@scaleo/core/data';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';

export class AffiliateBillingPreferencesModel {
    @Expose()
    invoice_frequency?: BaseIdTitleModel = undefined;

    @Expose({ name: 'invoice_days_of_the_month' })
    private _invoice_days_of_the_month?: string = undefined;

    private get invoiceDayOFMonth(): number[] {
        return this._invoice_days_of_the_month?.split(',').map((day) => +day);
    }

    @Expose()
    get invoiceStartDayOFMonth(): number {
        return this.invoiceDayOFMonth?.shift();
    }

    @Expose()
    get invoiceLastDayOFMonth(): number {
        return this.invoiceDayOFMonth?.pop();
    }

    @Expose()
    invoice_day_of_the_week?: string = undefined;

    @Expose()
    generate_invoice_automatically?: unknown = undefined;

    @Expose()
    get generateInvoiceAutomaticallyBoolean(): boolean {
        return !Number.isNaN(+this.generate_invoice_automatically) ? Boolean(this.generate_invoice_automatically) : undefined;
    }

    @Expose()
    get showGenerateInvoice(): boolean {
        if (this.invoice_frequency?.id === AffiliateInvoiceFrequencyEnum.BySchedule) {
            return this.generateInvoiceAutomaticallyBoolean;
        }

        // if invoice_frequency === PaymentsTypesEnum.ByAffiliateRequest always true
        return true;
    }

    @Expose()
    payment_terms?: BaseIdTitleModel = undefined;

    @Expose()
    beneficiary_name: string = undefined;

    @Expose()
    beneficiary_address: string = undefined;

    @Expose()
    billing_email: string = undefined;

    @Expose()
    tax_id: string = undefined;

    @Expose()
    vat: number = undefined;
}

export interface AffiliateBillingPreferencesRequestPayloadModel {
    payment_terms: number;
    beneficiary_name: string;
    beneficiary_address: string;
    billing_email: string;
    tax_id: string;
    vat: number;
}

export interface AffiliateBillingPreferencesSchedulePayloadModel extends AffiliateBillingPreferencesRequestPayloadModel {
    invoice_frequency: number;
    invoice_day_of_the_week: string;
    invoice_days_of_the_month: string;
    generate_invoice_automatically: number;
}
