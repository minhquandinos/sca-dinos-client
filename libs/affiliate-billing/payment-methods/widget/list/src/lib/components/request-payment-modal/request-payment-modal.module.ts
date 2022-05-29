import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomFileUploadModule, InputModule } from '@scaleo/shared/components';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3InfoModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { RequestPaymentModalComponent } from './request-payment-modal.component';

@NgModule({
    declarations: [RequestPaymentModalComponent],
    imports: [
        CommonModule,
        SharedModule,
        InputModule,
        UiButtonLinkModule,
        CustomFileUploadModule,
        PlatformFormatPipeModule,
        DisableButtonDuringRequestDirectiveModule,
        Modal3InfoModule
    ],
    exports: [RequestPaymentModalComponent]
})
export class RequestPaymentModalModule {}
