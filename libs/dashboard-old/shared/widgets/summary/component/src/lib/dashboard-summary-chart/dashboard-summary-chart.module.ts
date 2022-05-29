import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomChartModule } from '@scaleo/shared/components';

import { DashboardSummaryChartComponent } from './dashboard-summary-chart.component';

@NgModule({
    declarations: [DashboardSummaryChartComponent],
    exports: [DashboardSummaryChartComponent],
    imports: [CommonModule, SharedModule, CustomChartModule, PlatformFormatPipeModule]
})
export class DashboardSummaryChartModule {}
