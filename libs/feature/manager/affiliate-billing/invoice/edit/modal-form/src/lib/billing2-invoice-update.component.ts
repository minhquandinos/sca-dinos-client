import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ManagerBillingInvoiceConfirmChangeStatusService } from '@scaleo/feature/manager/affiliate-billing/common';
import {
    Billing2InvoiceUpdateService,
    MANAGER_INVOICE_EDIT_PROVIDER
} from '@scaleo/feature/manager/affiliate-billing/invoice/edit/data-access';
import { Billing2InvoicesToastrService } from '@scaleo/feature/manager/affiliate-billing/invoices/data-access';
import { Billing2InvoiceUpdateRequestModel, InvoiceAttachmentEventEnum } from '@scaleo/invoice/common';
import { FileExtensionEnum } from '@scaleo/platform/data';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

import { AttachmentFileComponent } from '../../../../../../../../shared/components2/attachment-file/src/lib/attachment-file.component';

@Component({
    selector: 'app-billing2-invoice-update',
    templateUrl: './billing2-invoice-update.component.html',
    providers: [
        UnsubscribeService,
        MANAGER_INVOICE_EDIT_PROVIDER,
        Billing2InvoicesToastrService,
        ManagerBillingInvoiceConfirmChangeStatusService
    ]
})
export class Billing2InvoiceUpdateComponent implements OnInit {
    id: number;

    form: FormGroup;

    isLoad: boolean;

    allowedAcceptFile = [
        FileExtensionEnum.PDF,
        FileExtensionEnum.PNG,
        FileExtensionEnum.DOC,
        FileExtensionEnum.XLS,
        FileExtensionEnum.CSV,
        FileExtensionEnum.JPEG,
        FileExtensionEnum.DOCX,
        FileExtensionEnum.XLSX
    ];

    canDelete: boolean;

    loadInvoiceStatus: InvoiceStatusNameEnum;

    @ViewChild(AttachmentFileComponent)
    attachmentFileComponent: AttachmentFileComponent;

    sendingRequest = false;

    sendingRequest2 = Symbol('request');

    constructor(
        private fb: FormBuilder,
        private service: Billing2InvoiceUpdateService,
        private unsubscribe: UnsubscribeService,
        private toastr: ToastrBarService,
        private translate: TranslateService,
        private invoicesToastrService: Billing2InvoicesToastrService,
        private readonly confirmChangeStatus: ManagerBillingInvoiceConfirmChangeStatusService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly modal3: Modal3Service
    ) {
        const { id } = this.modal3EditFormRef.config.data;
        this.id = id;
    }

    ngOnInit(): void {
        this.initForm();
        this.loadData();
    }

    changeStatusHandler(event: SelectChangeModel) {
        const { oldValue, newValue } = event;
        if (oldValue === InvoiceStatusNameEnum.Unpaid && newValue === InvoiceStatusNameEnum.Draft) {
            this.form.enable();
        }

        if (newValue === InvoiceStatusNameEnum.Unpaid || newValue === InvoiceStatusNameEnum.Paid) {
            this.disabledForm(['status', 'internal_notes']);
        }
    }

    update(): void {
        this.save();
    }

    private initForm(): void {
        this.form = this.fb.group({
            status: [InvoiceStatusNameEnum.Draft],
            date_due: [''],
            invoice_memo: [''],
            internal_notes: [''],
            attachment: ['']
        });
    }

    private loadData(): void {
        this.service
            .show(this.id)
            .pipe(
                tap((response) => {
                    this.form.patchValue({
                        ...response,
                        attachment: response.attachment
                    });
                    this.isLoad = true;
                }),
                tap(({ status }) => {
                    this.loadInvoiceStatus = status;
                    if (status === InvoiceStatusNameEnum.Paid) {
                        this.disabledForm(['internal_notes']);
                    }
                    if (status === InvoiceStatusNameEnum.Unpaid) {
                        this.disabledForm(['status', 'internal_notes']);
                    }
                    if (status === InvoiceStatusNameEnum.Draft) {
                        this.canDelete = true;
                    }
                }),
                first()
            )
            .toPromise()
            .then();
    }

    private save(): void {
        const { valid, value, disabled } = this.form;
        if (valid || disabled) {
            this.sendingRequest = true;
            const payload: Billing2InvoiceUpdateRequestModel = {
                ...value,
                attachment_file: value.attachment
            };

            this.confirmWhenPaidStatus$
                .pipe(
                    filter((event) => !!event),
                    switchMap(() => this.service.update(this.id, payload))
                )
                .toPromise()
                .then(
                    (response) => {
                        this.modal3EditFormRef.close(response, Modal3CloseEventEnum.Update);
                        this.invoicesToastrService.updated();
                    },
                    () => {
                        this.invoicesToastrService.exceptionUpdated();
                        this.sendingRequest = false;
                    }
                );
        } else {
            this.form.markAllAsTouched();
        }
    }

    private get confirmWhenPaidStatus$(): Observable<boolean> {
        if (this.loadInvoiceStatus !== InvoiceStatusNameEnum.Paid && this.form.value.status === InvoiceStatusNameEnum.Paid) {
            return this.confirmChangeStatus.confirm().pipe(map(({ type }) => type === Modal3CloseEventEnum.Confirm));
        }

        return of(true);
    }

    private disabledForm(enabledControls?: string[]): void {
        this.form.disable();

        if (enabledControls.length > 0) {
            enabledControls.forEach((control) => {
                this.form.get(control).enable();
            });
        }
    }

    deleteAttachment() {
        this.service.deleteAttachment(this.id).then(
            () => {
                this.form.get('attachment').reset();
                this.toastr.response(ToastrBarEventEnum.DeletedFile);
                this.attachmentFileComponent.selectedAttachment = false;
                this.modal3EditFormRef.close(null, InvoiceAttachmentEventEnum.Delete);
            },
            () => {
                this.toastr.response(ToastrBarEventEnum.DeletedFileException);
            }
        );
    }

    delete() {
        const title = this.translate.instant('interface.confirm.title');
        const message = this.translate.instant('invoice.delete_confirm_text');

        this.modal3
            .confirm(message, { title })
            .afterClosed$.pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.service.destroy(this.id)),
                catchError((error) => {
                    this.invoicesToastrService.exceptionDeleted();
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this.invoicesToastrService.deleted();
            });
    }
}
