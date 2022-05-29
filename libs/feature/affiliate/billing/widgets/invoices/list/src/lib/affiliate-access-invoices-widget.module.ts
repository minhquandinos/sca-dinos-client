import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { AffiliateInvoicesListModule } from './affiliate-invoices-list/affiliate-invoices-list.module';
import { AffiliateAccessInvoicesWidgetComponent } from './components/affiliate-access-invoices-widget/affiliate-access-invoices-widget.component';

@NgModule({
    declarations: [AffiliateAccessInvoicesWidgetComponent],
    imports: [CommonModule, AffiliateInvoicesListModule, SharedModule],
    exports: [AffiliateAccessInvoicesWidgetComponent]
})
export class AffiliateAccessInvoicesWidgetModule {}
