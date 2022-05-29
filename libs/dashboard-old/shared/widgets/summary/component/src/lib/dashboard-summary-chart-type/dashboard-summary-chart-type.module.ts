import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ConfigTableColumnModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { DashboardSummaryChartTypeComponent } from './dashboard-summary-chart-type.component';
import { DashboardSummaryChartTypeSwitcherDirective } from './dashboard-summary-chart-type-switcher.directive';

@NgModule({
    declarations: [DashboardSummaryChartTypeComponent, DashboardSummaryChartTypeSwitcherDirective],
    exports: [DashboardSummaryChartTypeComponent],
    imports: [
        CommonModule,
        SharedModule,
        ConfigTableColumnModule,
        UiPageWrapperModule,
        SelectModule,
        UiButtonLinkModule,
        CustomTranslatePipeModule
    ]
})
export class DashboardSummaryChartTypeModule {}
