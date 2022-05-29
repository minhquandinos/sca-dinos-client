import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BooleanEnum } from '@scaleo/core/data';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';

@Component({
    template: ''
})
export abstract class BaseBillingPreferencesEditComponent {
    @Input()
    abstract data: unknown;

    @Input()
    id: number;

    form: FormGroup;

    vatCommissions: number[] = [...Array(51).keys()];

    readonly booleanEnum = BooleanEnum;

    readonly affiliateInvoiceFrequencyEnum = AffiliateInvoiceFrequencyEnum;

    protected constructor() {}

    protected abstract initForm(): void;

    protected abstract pathDataToForm(): void;

    protected abstract save(): void;
}
