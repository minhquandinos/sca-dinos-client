import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerConversionsChangeStatusModule } from '@scaleo/feature/manager/reports/transactions/conversion/change-status/component';
import { ConversionEditModalModule } from '@scaleo/feature/manager/reports/transactions/conversion/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportDateRangeModule } from '@scaleo/reports/shared/components/date-range';
import { ReportFiltersModule } from '@scaleo/reports/shared/filters/component';
import { ReportFormatFieldsModule } from '@scaleo/reports/shared/format-fields';
import { TransactionReportListModule } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { TransactionReportWrapperModule } from '@scaleo/reports/transactions/shared/components/transaction-wrapper';
import {
    ConfigTableColumn2Module,
    CustomCheckboxModule,
    CustomDateRangeModule,
    CustomPaginationModule,
    ReportExportModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import {
    DropdownMenuModule,
    TableNavigationModule,
    UiButtonLinkModule,
    UiDividerModule,
    UiPageWrapperModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

// import { ColorFieldByKeyValueDirectiveModule } from '../../../../../../../reports/shared/format-fields/src/lib/shared/directives/color-field-by-key-value/color-field-by-key-value.directive.module';
import { LeadsListComponent } from './components/leads-list/leads-list.component';

@NgModule({
    declarations: [LeadsListComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        ConfigTableColumn2Module,
        CustomPaginationModule,
        CustomDateRangeModule,
        SharedModule,
        ResultCountModule,
        // ColorFieldByKeyValueDirectiveModule,
        PlatformFormatPipeModule,
        ReportFiltersModule,
        ReportLastUpdatedModule,
        ReportDateRangeModule,
        ReportFormatFieldsModule,
        UiDividerModule,
        UiSvgIconModule,
        UiTable2Module,
        DropdownMenuModule,
        ReportExportModule,
        CustomCheckboxModule,
        ManagerConversionsChangeStatusModule,
        TransactionReportWrapperModule,
        ConversionEditModalModule,
        TableNavigationModule,
        TransactionReportListModule,
        UiLoaderModule
    ]
})
export class ManagerLeadsManageListModule {}
