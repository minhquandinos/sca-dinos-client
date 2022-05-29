import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiTable2Module } from '@scaleo/ui-kit/elements';

import { TransactionReportListComponent } from './transaction-report-list.component';

@NgModule({
    declarations: [TransactionReportListComponent],
    imports: [CommonModule, UiTable2Module],
    exports: [TransactionReportListComponent]
})
export class TransactionReportListModule {}
