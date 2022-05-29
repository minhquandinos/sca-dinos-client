import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ChartComparePeriodComponent } from './chart-compare-period.component';

@NgModule({
    declarations: [ChartComparePeriodComponent],
    imports: [ChartModule, PlatformFormatPipeModule],
    exports: [ChartComparePeriodComponent]
})
export class ChartComparePeriodModule {}
