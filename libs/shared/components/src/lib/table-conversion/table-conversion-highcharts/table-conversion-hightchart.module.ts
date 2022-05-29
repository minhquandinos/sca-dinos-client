import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartComparePeriodModule } from '../../../../../../chart/shared/charts/compare-period/src/lib/chart-compare-period.module';
import { TableConversionHighchartsComponent } from './table-conversion-highcharts.component';

@NgModule({
    declarations: [TableConversionHighchartsComponent],
    imports: [CommonModule, ChartComparePeriodModule],
    exports: [TableConversionHighchartsComponent]
})
export class TableConversionHightchartModule {}
