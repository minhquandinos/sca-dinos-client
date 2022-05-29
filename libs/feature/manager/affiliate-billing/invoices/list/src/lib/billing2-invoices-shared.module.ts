import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';
import { CustomFileUploadModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

@NgModule({
    declarations: [],
    imports: [CommonModule, UiSvgIconModule, RouterModule, InvoiceDownloadModule, CustomFileUploadModule, SharedModule],
    exports: []
})
export class Billing2InvoicesSharedModule {}
