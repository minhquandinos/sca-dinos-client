import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output } from '@angular/core';

import { WindowRefService } from '@scaleo/core/window-ref/service';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-billing2-invoice-attachment',
    template: `
        <ui-svg-icon
            *ngIf="attachment"
            class="cursor-pointer"
            icon="ic_attachment"
            (click)="downloadAttachment()"
            [tooltip]="'interface.basic.download' | translate"
        ></ui-svg-icon>
        <app-custom-file-upload
            *ngIf="!attachment && showUpload$ | async"
            [labelButton]="'interface.basic.upload' | translate"
            [(ngModel)]="file"
            typeButton="link"
            [hideSelectedFile]="true"
            (ngModelChange)="uploadFile($event)"
        ></app-custom-file-upload>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceAttachmentComponent implements OnInit {
    @HostBinding('class') hostClass: string;

    @Input()
    attachment: string;

    @Input()
    status: InvoiceStatusNameEnum;

    @Output() upload: EventEmitter<File> = new EventEmitter<File>();

    file: File;

    showUpload$ = this.checkPermissionService.check$(this.permissions.canGenerateEditDeleteInvoices);

    constructor(
        private readonly window: WindowRefService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        if (this.status === InvoiceStatusNameEnum.InProgress) {
            this.hostClass = 'invisible';
        } else {
            this.hostClass = !this.attachment ? 'invoice-upload-attachment' : '';
        }
    }

    downloadAttachment() {
        this.window.nativeWindow.open(this.attachment, '_blank');
    }

    uploadFile(file: File) {
        this.upload.emit(file);
    }
}
