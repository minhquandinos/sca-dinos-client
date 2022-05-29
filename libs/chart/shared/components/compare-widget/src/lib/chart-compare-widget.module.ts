import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartComparePeriodModule } from '@scaleo/chart/shared/charts/compare-period';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PositiveNegativeModule } from '@scaleo/shared/pipes';
import { UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { ChartCompareWidgetComponent } from './chart-compare-widget.component';

@NgModule({
    declarations: [ChartCompareWidgetComponent],
    imports: [CommonModule, ChartComparePeriodModule, PlatformFormatPipeModule, SharedModule, PositiveNegativeModule, UiSkeletonModule],
    exports: [ChartCompareWidgetComponent]
})
export class ChartCompareWidgetModule {}
