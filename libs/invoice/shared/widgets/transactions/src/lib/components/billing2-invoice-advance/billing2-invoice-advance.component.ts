import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { CurrencyEnum } from '@scaleo/platform/currency/models';

import { Billing2InvoiceAdditionalTransactionService } from '../../services/billing2-invoice-additional-transaction.service';
import { BaseAdditionalTransactionComponent } from '../base-additional-transaction.component';

@Component({
    selector: 'app-billing2-invoice-advance',
    templateUrl: './billing2-invoice-advance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: Billing2InvoiceAdvanceComponent
        }
    ],
    providers: [Billing2InvoiceAdditionalTransactionService]
})
export class Billing2InvoiceAdvanceComponent extends BaseAdditionalTransactionComponent {
    @Input() currency: CurrencyEnum;

    @Output() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

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

    delete() {
        this.deleteEvent.emit();
    }
}
