import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Billing2InvoiceAdditionalTransactionService } from '../services/billing2-invoice-additional-transaction.service';

@Component({
    template: ''
})
export abstract class BaseAdditionalTransactionComponent {
    @Input() control: FormGroup;

    @Output() saveEvent: EventEmitter<void> = new EventEmitter();

    showSaveBtn$ = this.additionalTransactionService.controlChanged$;

    protected constructor(protected additionalTransactionService: Billing2InvoiceAdditionalTransactionService) {}

    abstract save(): void;

    changed() {
        if (!this.additionalTransactionService.controlChanged) {
            this.additionalTransactionService.controlValueChanges(this.control);
        }
    }
}
