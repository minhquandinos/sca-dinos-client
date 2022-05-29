import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { FileExtensionEnum, SheetExtensionType } from '@scaleo/platform/data';
import { Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'app-modal-export',
    templateUrl: './modal-export.component.html',
    providers: [UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalExportComponent implements OnInit {
    @Output() exportFormat: EventEmitter<SheetExtensionType> = new EventEmitter<SheetExtensionType>();

    @Input() modalTitle: string;

    form: FormGroup;

    readonly fileFormats: FileExtensionEnum[] = [FileExtensionEnum.XLSX, FileExtensionEnum.CSV];

    private exportModal: Modal3Ref;

    @ViewChild('modalContentTpl', { static: true })
    private readonly modalContentTpl: TemplateRef<HTMLElement>;

    @ViewChild('modalFooterTpl', { static: true })
    private readonly modalFooterTpl: TemplateRef<HTMLElement>;

    constructor(private readonly modal3: Modal3Service, private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    openModal(): void {
        this.exportModal = this.modal3.info(this.modalContentTpl, {
            title: this.modalTitle,
            footer: {
                template: this.modalFooterTpl,
                borderTop: true
            },
            width: '600px',
            maxWidth: '600px'
        });
    }

    closeModal(): void {
        this.exportModal.close();
        this.resetExportModal();
    }

    saveModal(): void {
        this.exportFormat.emit(this.form.value.format);
        this.closeModal();
    }

    private initForm(): void {
        this.form = this.fb.group({
            format: FileExtensionEnum.XLSX
        });
    }

    private resetExportModal(): void {
        this.exportModal = null;
    }
}
