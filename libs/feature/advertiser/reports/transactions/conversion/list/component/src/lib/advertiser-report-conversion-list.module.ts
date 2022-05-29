import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { TableNavigationModule, UiDividerModule, UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AdvertiserReportConversionsComponent } from './advertiser-report-conversions.component';

@NgModule({
    declarations: [AdvertiserReportConversionsComponent],
    imports: [
        CommonModule,
        TransactionReportWrapperModule,
        ResultCountModule,
        UiDividerModule,
        ConfigTableColumn2Module,
        UiSvgIconModule,
        ReportExportModule,
        UiPageWrapperModule,
        ReportFiltersModule,
        ReportDateRangeModule,
        ReportLastUpdatedModule,
        TableNavigationModule,
        ReportFormatFieldsModule,
        SharedModule,
        TransactionReportListModule,
        UiLoaderModule
    ]
})
export class AdvertiserReportConversionListModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]): ModuleWithProviders<any> {
        return {
            ngModule: AdvertiserReportConversionListModule,
            providers: [
                { provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters }
            ]
        };
    }
}
