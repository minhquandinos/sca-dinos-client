import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomPaginationModule } from '@scaleo/shared/components';
import { UiPageWrapperModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { TransactionReportWrapperComponent } from './transaction-report-wrapper.component';

@NgModule({
    declarations: [TransactionReportWrapperComponent],
    imports: [CommonModule, UiTable2Module, CustomPaginationModule, UiPageWrapperModule],
    exports: [TransactionReportWrapperComponent]
})
export class TransactionReportWrapperModule {}
