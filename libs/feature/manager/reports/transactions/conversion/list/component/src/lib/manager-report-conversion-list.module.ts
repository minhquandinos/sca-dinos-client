import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreConfigOptions } from '@datorama/akita';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerConversionsChangeStatusModule } from '@scaleo/feature/manager/reports/transactions/conversion/change-status/component';
import { ManagerReportConversionsImportModule } from '@scaleo/feature/manager/reports/transactions/conversion/import/component';
import { ReportDateRangeModule } from '@scaleo/reports/shared/components/date-range';
import { ReportInfoModule } from '@scaleo/reports/shared/components/info-wrapper';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportFiltersModule } from '@scaleo/reports/shared/filters/component';
import { ReportFormatFieldsModule } from '@scaleo/reports/shared/format-fields';
import { TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';
import { REPORT_CONVERSIONS_PROVIDER } from '@scaleo/reports/transactions/conversion/data-access';
import { TransactionReportListModule } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { TransactionReportWrapperModule } from '@scaleo/reports/transactions/shared/components/transaction-wrapper';
import { ConfigTableColumn2Module, ReportExportModule, ReportLastUpdatedModule, ResultCountModule } from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { TableNavigationModule, UiDividerModule, UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ManagerReportConversionsComponent } from './manager-report-conversions.component';

@NgModule({
    declarations: [ManagerReportConversionsComponent],
    imports: [
        CommonModule,
        TransactionReportWrapperModule,
        ResultCountModule,
        UiDividerModule,
        ReportInfoModule,
        ManagerReportConversionsImportModule,
        ConfigTableColumn2Module,
        UiSvgIconModule,
        ManagerConversionsChangeStatusModule,
        ReportExportModule,
        UiPageWrapperModule,
        ReportFiltersModule,
        ReportDateRangeModule,
        ReportLastUpdatedModule,
        TableNavigationModule,
        ReportFormatFieldsModule,
        SharedModule,
        TransactionReportListModule,
        // AkitaNgEffectsModule.forFeature([ReportConversionEffects]),
        UiLoaderModule
    ],
    providers: [REPORT_CONVERSIONS_PROVIDER],
    exports: [ManagerReportConversionsComponent]
})
export class ManagerReportConversionListModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]): ModuleWithProviders<any> {
        return {
            ngModule: ManagerReportConversionListModule,
            providers: [
                { provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters }
            ]
        };
    }
}
