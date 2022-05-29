import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomSwitchModule } from '@scaleo/shared/components';
import { ChangeColorOfNumberModule } from '@scaleo/shared/directives';
import { PositiveNegativeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { PerformanceMetricListModule } from './components/performance-metric-list/performance-metric-list.module';
import { PerformanceWidgetChartModule } from './components/performance-widget-chart/performance-widget-chart.module';
import { PerformanceWidgetFooterComponent } from './components/performance-widget-footer/performance-widget-footer.component';
import { PerformanceWidgetFooterMetricComponent } from './components/performance-widget-footer/performance-widget-footer-metric.component';
import { PerformanceWidgetComponent } from './performance-widget.component';

@NgModule({
    declarations: [PerformanceWidgetComponent, PerformanceWidgetFooterComponent, PerformanceWidgetFooterMetricComponent],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        UiButtonLinkModule,
        SharedModule,
        NgSelectModule,
        CustomSwitchModule,
        UiSwitchModule,
        PerformanceMetricListModule,
        PlatformFormatPipeModule,
        PerformanceWidgetChartModule,
        RouterModule,
        ChangeColorOfNumberModule,
        PositiveNegativeModule
    ],
    exports: [PerformanceWidgetComponent],
    providers: []
})
export class PerformanceWidgetModule {}
