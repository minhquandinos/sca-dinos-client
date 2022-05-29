import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { CustomChartComponent } from './custom-chart.component';

@NgModule({
    imports: [CommonModule, ChartModule],
    declarations: [CustomChartComponent],
    exports: [CommonModule, CustomChartComponent],
    providers: []
})
export class CustomChartModule {}
