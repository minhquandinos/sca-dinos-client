import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { InvoiceDownloadComponent } from './invoice-download.component';

@NgModule({
    declarations: [InvoiceDownloadComponent],
    imports: [CommonModule, UiButtonLinkModule, TranslateModule, UiSvgIconModule],
    exports: [InvoiceDownloadComponent]
})
export class InvoiceDownloadModule {}
