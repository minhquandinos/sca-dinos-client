import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartCompareWidgetModule } from '@scaleo/chart/shared/components/compare-widget';
import { SharedModule } from '@scaleo/core/shared/module';
import { DayPresetsModule, NotFoundModule } from '@scaleo/shared/components';
import { CardModule, UiTabModule } from '@scaleo/ui-kit/elements';

import { TrendChartWidgetComponent } from './components/trend-chart-widget/trend-chart-widget.component';
import { TrendTabDirective } from './directives/trend-tab.directive';
import { TrendsWidgetService } from './services/trends-widget.service';
import { TrendsWidgetComponent } from './trends-widget.component';

@NgModule({
    declarations: [TrendsWidgetComponent, TrendChartWidgetComponent, TrendTabDirective],
    imports: [
        CommonModule,
        CardModule,
        DayPresetsModule,
        ChartCompareWidgetModule,
        FlexLayoutModule,
        UiTabModule,
        SharedModule,
        NotFoundModule
    ],
    exports: [TrendsWidgetComponent, TrendChartWidgetComponent, TrendTabDirective],
    providers: [TrendsWidgetService]
})
export class TrendsWidgetModule {}
