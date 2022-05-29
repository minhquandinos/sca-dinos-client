import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomDateRangeModule } from '@scaleo/shared/components';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { DashboardSummaryComponent } from './dashboard-summary.component';
import { DashboardSummaryChartModule } from './dashboard-summary-chart/dashboard-summary-chart.module';
import { DashboardSummaryChartTypeModule } from './dashboard-summary-chart-type/dashboard-summary-chart-type.module';

@NgModule({
    declarations: [DashboardSummaryComponent],
    exports: [DashboardSummaryComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        CustomDateRangeModule,
        DashboardSummaryChartTypeModule,
        DashboardSummaryChartModule
    ]
})
export class DashboardSummaryModule {}
