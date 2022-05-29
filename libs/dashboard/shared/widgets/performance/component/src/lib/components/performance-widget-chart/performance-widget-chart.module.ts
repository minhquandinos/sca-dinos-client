import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartComparePeriodModule } from '@scaleo/chart/shared/charts/compare-period';

import { PerformanceWidgetChartComponent } from './performance-widget-chart.component';

@NgModule({
    imports: [CommonModule, ChartComparePeriodModule],
    declarations: [PerformanceWidgetChartComponent],
    exports: [PerformanceWidgetChartComponent]
})
export class PerformanceWidgetChartModule {}
