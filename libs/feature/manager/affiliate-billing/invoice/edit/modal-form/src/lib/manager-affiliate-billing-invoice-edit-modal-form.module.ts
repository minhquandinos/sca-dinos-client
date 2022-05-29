import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputDateModule, TextareaModule } from '@scaleo/shared/components';
import { FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { AttachmentFileModule } from '@scaleo/shared/components2/attachment-file';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { Billing2InvoiceUpdateComponent } from './billing2-invoice-update.component';

@NgModule({
    declarations: [Billing2InvoiceUpdateComponent],
    imports: [
        CommonModule,
        TextareaModule,
        SharedModule,
        FindPlatformListModule,
        FindPlatformStatusesModule,
        AttachmentFileModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        InputDateModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class ManagerAffiliateBillingInvoiceEditModalFormModule {}
