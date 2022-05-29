import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindInvoicesComponent } from './find-invoices.component';

@NgModule({
    declarations: [FindInvoicesComponent],
    imports: [CommonModule, SelectModule, SharedModule],
    exports: [FindInvoicesComponent]
})
export class FindInvoicesModule {}
