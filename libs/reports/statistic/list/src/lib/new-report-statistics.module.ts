import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreConfigOptions } from '@datorama/akita';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@scaleo/core/shared/module';
import { ReportCurrencyModule } from '@scaleo/reports/shared/components/currency-dropdown';
import { ReportDateRangeModule } from '@scaleo/reports/shared/components/date-range';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportFiltersModule } from '@scaleo/reports/shared/filters/component';
import { ReportFormatFieldsModule } from '@scaleo/reports/shared/format-fields';
import { REPORT_STATISTIC_STORE_CONFIG_TOKEN } from '@scaleo/reports/statistic/common';
import {
    ConfigTableColumnModule,
    CustomInfoTooltipModule,
    ReportExportModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { UiLoaderModule } from '@scaleo/ui-kit/components/loader';
import { UiButtonLinkModule, UiDividerModule, UiPageWrapperModule, UiSkeletonModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsComponent } from './components/new-report-statistics/new-report-statistics.component';
import { NewStatisticsGroupModule } from './components/new-statistics-group/new-statistics-group.module';
import { ReportStatisticsTableHeaderComponent } from './components/report-statistics-table-header/report-statistics-table-header.component';
import { RenderBreakdownExpandCollapseBtnDirective } from './components/report-statistics-table-row/directives/render-breakdown-expand-collapse-btn.directive';
import { ReportStatisticsTableColClassNameDirective } from './components/report-statistics-table-row/directives/report-statistics-table-col-class-name.directive';
import { RenderReportColFieldPipe } from './components/report-statistics-table-row/pipes/render-report-col-field.pipe';
import { ReportStatisticsTableRowComponent } from './components/report-statistics-table-row/report-statistics-table-row.component';
import { ReportStatisticsTableTotalsComponent } from './components/report-statistics-table-totals/report-statistics-table-totals.component';
import { NewReportStatisticsLayoutComponent } from './containers/new-report-statistics-layout/new-report-statistics-layout.component';
import { NewReportStatisticsTableService } from './services/new-report-statistics-table.service';
import {
    NewReportStatisticsBreakdownService,
    NewReportStatisticsColumnsService,
    NewReportStatisticsQuery,
    NewReportStatisticsService,
    NewReportStatisticsStore
} from './state';
import { NewReportStatisticsSortService } from './state/new-report-statistics-sort.service';

@NgModule({
    declarations: [
        NewReportStatisticsComponent,
        ReportStatisticsTableHeaderComponent,
        RenderBreakdownExpandCollapseBtnDirective,
        ReportStatisticsTableRowComponent,
        ReportStatisticsTableColClassNameDirective,
        ReportStatisticsTableTotalsComponent,
        RenderReportColFieldPipe,
        NewReportStatisticsLayoutComponent
    ],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        InfiniteScrollModule,
        RouterModule,
        ConfigTableColumnModule,
        SharedModule,
        UiTable2Module,
        // NewReportStatisticsRoutingModule,
        ReportFormatFieldsModule,
        UiButtonLinkModule,
        NewStatisticsGroupModule,
        UiSkeletonModule,
        ReportFiltersModule,
        ResultCountModule,
        ReportLastUpdatedModule,
        ReportExportModule,
        ReportDateRangeModule,
        CustomInfoTooltipModule,
        UiDividerModule,
        ReportCurrencyModule,
        // AkitaNgEffectsModule.forFeature([NewReportStatisticsEffects]),
        UiLoaderModule
    ],
    exports: [NewReportStatisticsComponent],
    providers: [
        NewReportStatisticsQuery,
        NewReportStatisticsService,
        NewReportStatisticsStore,
        NewReportStatisticsBreakdownService,
        NewReportStatisticsColumnsService,
        NewReportStatisticsSortService,
        NewReportStatisticsTableService
    ]
})
export class NewReportStatisticsModule {
    static forRoot(config: Partial<StoreConfigOptions>, defaultFilters: ReportFilterFilterEnum[]) {
        return {
            ngModule: NewReportStatisticsModule,
            providers: [
                { provide: REPORT_STATISTIC_STORE_CONFIG_TOKEN, useValue: config },
                { provide: REPORT_DEFAULT_FILTERS_TOKEN, useValue: defaultFilters }
            ]
        };
    }
}
