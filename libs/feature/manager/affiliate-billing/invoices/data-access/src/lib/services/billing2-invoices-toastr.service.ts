import { Injectable } from '@angular/core';

import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Injectable()
export class Billing2InvoicesToastrService {
    private titleSchema = 'invoice.invoice_title';

    constructor(private toastr: ToastrBarService) {}

    created(): void {
        this.toastr.response(ToastrBarEventEnum.Created, this.titleSchema);
    }

    updated(): void {
        this.toastr.response(ToastrBarEventEnum.Updated, this.titleSchema);
    }

    exceptionUpdated(): void {
        this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, this.titleSchema);
    }

    deleted(): void {
        this.toastr.response(ToastrBarEventEnum.Deleted, this.titleSchema);
    }

    exceptionDeleted(): void {
        this.toastr.response(ToastrBarEventEnum.ExceptionDeleted, this.titleSchema);
    }

    exceptionCreated(): void {
        this.toastr.response(ToastrBarEventEnum.ExceptionCreated, this.titleSchema);
    }

    custom(message: string): void {
        this.toastr.response(ToastrBarEventEnum.Custom, message, 'error');
    }

    multiDeleteSuccess(): void {
        this.toastr.response(ToastrBarEventEnum.Custom, 'invoice.multi_delete.success', 'success');
    }

    multiChangeStatusSuccess(): void {
        this.toastr.response(ToastrBarEventEnum.Custom, 'invoice.multi_change_status.success', 'success');
    }

    multiChangeStatusException(): void {
        this.toastr.response(ToastrBarEventEnum.Custom, 'invoice.multi_change_status.exception', 'error');
    }

    multiDeleteException(): void {
        this.toastr.response(ToastrBarEventEnum.Custom, 'invoice.multi_delete.exception', 'error');
    }

    exception(): void {
        this.toastr.exception();
    }
}
