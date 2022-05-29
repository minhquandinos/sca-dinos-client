import { ChangeDetectionStrategy, Component, Inject, Input, Optional, TemplateRef, ViewChild } from '@angular/core';

import { AffiliateBillingPreferencesModel } from '@scaleo/affiliate-billing/preferences/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { FormatPipe } from '@scaleo/platform/format/pipe';

import {
    BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN,
    BillingPreferencesViewFieldOptionsModel
} from '../../billing-preferences-view-config.model';
import { BillingPreferencesFieldEnum } from '../../enums/billing-preferences-field.enum';
import { BillingPreferencesFieldType } from '../../types/billing-preferences-field.type';
import { billingPreferencesFields } from '../../utils/billing-preferences-fields.util';

interface PreferencesTplMapperModel {
    [key: string]: {
        label: string;
        tpl: TemplateRef<any>;
        context?:
            | {
                  [key: string]: unknown;
              }
            | unknown;
        condition: unknown;
    };
}

@Component({
    selector: 'scaleo-billing-preferences-view',
    templateUrl: './affiliate-billing-preferences-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, FormatPipe]
})
export class AffiliateBillingPreferencesViewComponent {
    @ViewChild('class') hostClass = 'd-block';

    @Input() set data(value: AffiliateBillingPreferencesModel) {
        this.setTplMapper(value);
    }

    @Input() fields: BillingPreferencesFieldType[] = billingPreferencesFields();

    @ViewChild('frequencyTpl', { static: true }) frequencyTpl: TemplateRef<any>;

    @ViewChild('generationInvoiceTpl', { static: true }) generationInvoiceTpl: TemplateRef<any>;

    @ViewChild('defaultTpl', { static: true }) defaultTpl: TemplateRef<any>;

    tplMapper: PreferencesTplMapperModel = {};

    constructor(
        private unsubscribe: UnsubscribeService,
        private format: FormatPipe,
        @Optional() @Inject(BILLING_PREFERENCES_VIEW_OPTIONS_TOKEN) private readonly fieldOptions: BillingPreferencesViewFieldOptionsModel
    ) {}

    private setTplMapper(value: AffiliateBillingPreferencesModel): void {
        this.tplMapper = {
            [BillingPreferencesFieldEnum.Frequency]: {
                label: 'invoice.settings.frequency_title',
                tpl: this.frequencyTpl,
                context: {
                    type: value?.invoice_frequency?.id,
                    dayOfTheWeek: value?.invoice_day_of_the_week,
                    firstDay: value?.invoiceStartDayOFMonth,
                    lastDay: value?.invoiceLastDayOFMonth
                },
                condition: this.fieldOptions?.conditions?.[BillingPreferencesFieldEnum.Frequency] || false
            },
            [BillingPreferencesFieldEnum.GenerationInvoice]: {
                label: 'invoice.settings.generation.title',
                tpl: this.generationInvoiceTpl,
                context: {
                    generateAutomatically: value?.generateInvoiceAutomaticallyBoolean
                },
                condition: this.fieldOptions?.conditions?.[BillingPreferencesFieldEnum.GenerationInvoice] || false
            },
            [BillingPreferencesFieldEnum.PaymentTerms]: {
                label: 'registration.basic.payment_terms',
                tpl: this.defaultTpl,
                condition: true,
                context: value?.payment_terms?.title
            },
            [BillingPreferencesFieldEnum.BeneficiaryName]: {
                label: 'billing2.affiliate.preferences.beneficiary_name',
                tpl: this.defaultTpl,
                condition: true,
                context: value?.beneficiary_name
            },
            [BillingPreferencesFieldEnum.BeneficiaryAddress]: {
                label: 'billing2.affiliate.preferences.beneficiary_address',
                tpl: this.defaultTpl,
                condition: true,
                context: value?.beneficiary_address
            },
            [BillingPreferencesFieldEnum.BillingEmail]: {
                label: 'billing2.affiliate.preferences.billing_email',
                tpl: this.defaultTpl,
                condition: true,
                context: value?.billing_email
            },
            [BillingPreferencesFieldEnum.TaxId]: {
                label: 'billing2.affiliate.preferences.tax_id',
                tpl: this.defaultTpl,
                condition: true,
                context: value?.tax_id
            },
            [BillingPreferencesFieldEnum.Vat]: {
                label: 'interface.basic.vat',
                tpl: this.defaultTpl,
                condition: true,
                context: this.format.transform(value?.vat, 'percent', { digitsAfterPoint: 0 }) as any
            }
        };
    }
}
