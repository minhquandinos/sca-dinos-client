import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartComparePeriodModule } from '@scaleo/chart/shared/charts/compare-period';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { NetworkSummaryLiveStreamComponent } from './network-summary-live-stream.component';

@NgModule({
    declarations: [NetworkSummaryLiveStreamComponent],
    imports: [CommonModule, ChartComparePeriodModule, PlatformFormatPipeModule, SharedModule],
    exports: [NetworkSummaryLiveStreamComponent]
})
export class NetworkSummaryLiveStreamModule {}
