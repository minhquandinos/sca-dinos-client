import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAdjustmentUpsertModule } from '@scaleo/feature/manager/reports/transactions/adjustment/upsert/modal-form';
import { DropdownEntityMenuModule } from '@scaleo/ui-kit/elements';

import { ManagerReportConversionsImportComponent } from './manager-report-conversions-import.component';

@NgModule({
    declarations: [ManagerReportConversionsImportComponent],
    imports: [CommonModule, SharedModule, DropdownEntityMenuModule, ManagerAdjustmentUpsertModule],
    exports: [ManagerReportConversionsImportComponent]
})
export class ManagerReportConversionsImportModule {}
