import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';

import { InvoiceLinkToDetailComponent } from './invoice-link-to-detail.component';

@NgModule({
    declarations: [InvoiceLinkToDetailComponent],
    imports: [CommonModule, RouterModule, InvoiceDownloadModule],
    exports: [InvoiceLinkToDetailComponent]
})
export class InvoiceLinkToDetailModule {}
