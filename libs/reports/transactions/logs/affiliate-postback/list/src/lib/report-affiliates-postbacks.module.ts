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
import {
    ConfigTableColumn2Module,
    CustomPaginationModule,
    ReportExportModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { UiDividerModule, UiPageWrapperModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { ReportAffiliatesPostbacksComponent } from './components/report-affiliates-postbacks.component';

@NgModule({
    declarations: [ReportAffiliatesPostbacksComponent],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        ResultCountModule,
        ConfigTableColumn2Module,
        UiTable2Module,
        CustomPaginationModule,
        ReportFormatFieldsModule,
        ReportFiltersModule,
        ReportDateRangeModule,
        ReportLastUpdatedModule,
        SharedModule,
        RouterModule,
        UiDividerModule,
        ReportExportModule,
        UiLoaderModule
    ]
})
export class ReportAffiliatesPostbacksModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]): ModuleWithProviders<any> {
        return {
            ngModule: ReportAffiliatesPostbacksModule,
            providers: [
                { provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters }
            ]
        };
    }
}
