import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { CurrencyEnum } from '@scaleo/platform/currency/models';

import { Billing2InvoiceAdditionalTransactionService } from '../../services/billing2-invoice-additional-transaction.service';
import { BaseAdditionalTransactionComponent } from '../base-additional-transaction.component';

@Component({
    selector: 'app-billing2-invoice-adjustment',
    templateUrl: './billing2-invoice-adjustment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: Billing2InvoiceAdjustmentComponent
        }
    ],
    providers: [Billing2InvoiceAdditionalTransactionService]
})
export class Billing2InvoiceAdjustmentComponent extends BaseAdditionalTransactionComponent {
    @Input() currency: CurrencyEnum;

    constructor(protected additionalTransactionService: Billing2InvoiceAdditionalTransactionService) {
        super(additionalTransactionService);
    }

    save() {
        if (this.control.valid) {
            this.additionalTransactionService.controlChanged = false;
            this.saveEvent.emit();
        } else {
            this.control.markAllAsTouched();
        }
    }
}
