import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreConfigOptions } from '@datorama/akita';

import { SharedModule } from '@scaleo/core/shared/module';
import { ReportDateRangeModule } from '@scaleo/reports/shared/components/date-range';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportFiltersModule } from '@scaleo/reports/shared/filters/component';
import { ReportFormatFieldsModule } from '@scaleo/reports/shared/format-fields';
import { TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';
import { TransactionReportListModule } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { TransactionReportWrapperModule } from '@scaleo/reports/transactions/shared/components/transaction-wrapper';
import { ConfigTableColumn2Module, ReportExportModule, ReportLastUpdatedModule, ResultCountModule } from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { UiDividerModule, UiPageWrapperModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { ReportInvalidClicksComponent } from './components/report-invalid-clicks/report-invalid-clicks.component';

@NgModule({
    declarations: [ReportInvalidClicksComponent],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        UiTable2Module,
        ReportFormatFieldsModule,
        ReportFiltersModule,
        SharedModule,
        RouterModule,
        TransactionReportWrapperModule,
        TransactionReportListModule,
        ResultCountModule,
        UiDividerModule,
        ReportExportModule,
        ConfigTableColumn2Module,
        ReportDateRangeModule,
        ReportLastUpdatedModule,
        UiLoaderModule
    ],
    exports: [ReportInvalidClicksComponent]
})
export class ReportInvalidClicksModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]): ModuleWithProviders<any> {
        return {
            ngModule: ReportInvalidClicksModule,
            providers: [
                { provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters }
            ]
        };
    }
}
