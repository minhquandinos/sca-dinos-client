import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreConfigOptions } from '@datorama/akita';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';

import { SharedModule } from '@scaleo/core/shared/module';
import { ReportDateRangeModule } from '@scaleo/reports/shared/components/date-range';
import { ReportInfoModule } from '@scaleo/reports/shared/components/info-wrapper';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportFiltersModule } from '@scaleo/reports/shared/filters/component';
import { ReportFormatFieldsModule } from '@scaleo/reports/shared/format-fields';
import { REPORT_CLICK_PROVIDER, ReportClicksEffects } from '@scaleo/reports/transactions/click/data-access';
import { TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';
import { TransactionReportListModule } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { TransactionReportWrapperModule } from '@scaleo/reports/transactions/shared/components/transaction-wrapper';
import {
    ConfigTableColumn2Module,
    FiltersModule,
    ReportExportModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { UiButtonLinkModule, UiDividerModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ReportClicksComponent } from './components/report-clicks/report-clicks.component';

@NgModule({
    declarations: [ReportClicksComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiButtonLinkModule,
        UiPageWrapperModule,
        FiltersModule,
        SharedModule,
        ReportFiltersModule,
        ReportLastUpdatedModule,
        ConfigTableColumn2Module,
        ResultCountModule,
        ReportInfoModule,
        ReportExportModule,
        ReportDateRangeModule,
        UiDividerModule,
        TransactionReportWrapperModule,
        TransactionReportListModule,
        ReportFormatFieldsModule,
        // AkitaNgEffectsModule.forFeature([ReportClicksEffects]),
        UiLoaderModule
    ],
    providers: [REPORT_CLICK_PROVIDER],
    exports: [ReportClicksComponent]
})
export class ReportClicksModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]): ModuleWithProviders<any> {
        return {
            ngModule: ReportClicksModule,
            providers: [
                { provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters },
                {
                    provide: 'restoreStore',
                    useFactory: () => {},
                    deps: []
                }
            ]
        };
    }
}
