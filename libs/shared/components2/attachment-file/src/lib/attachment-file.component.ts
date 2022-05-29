import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { startWith, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AcceptFileExtensionType } from '@scaleo/platform/data';

@Component({
    selector: 'app-attachment-file',
    templateUrl: './attachment-file.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ],
    providers: [UnsubscribeService]
})
export class AttachmentFileComponent implements OnInit {
    @Input() formName: string;

    @Input() label = 'table.column.attachment';

    @Input() set allowedAcceptFile(value: AcceptFileExtensionType) {
        if (Array.isArray(value)) {
            this.attachmentFileExtension = value.join(', ');
        } else {
            this.attachmentFileExtension = value.toLowerCase();
        }

        this.acceptFile = value;
    }

    @Output() deleteFile: EventEmitter<void> = new EventEmitter<void>();

    attachment: string;

    selectedAttachment: boolean;

    attachmentFileExtension: string;

    acceptFile: AcceptFileExtensionType;

    constructor(public parentForm: FormGroupDirective, private unsubscribe: UnsubscribeService) {}

    ngOnInit(): void {
        if (this.parentForm.form.get(this.formName).value) {
            this.selectedAttachment = true;
        }

        this.parentForm.form
            .get(this.formName)
            .valueChanges.pipe(
                startWith(this.parentForm.form.get(this.formName).value as string),
                tap((value) => {
                    this.attachment = value;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    deleteFileHandler(): void {
        this.deleteFile.emit();
    }
}
