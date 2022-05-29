import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';

import { ChartCompareWidgetModule } from '@scaleo/chart/shared/components/compare-widget';
import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { CustomCheckboxModule, CustomSwitchModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { NetworkSummaryLiveStreamModule } from './components/network-summary-live-stream/network-summary-live-stream.module';
import { NetworkSummaryWidgetComponent } from './network-summary-widget.component';

@NgModule({
    declarations: [NetworkSummaryWidgetComponent],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        UiButtonLinkModule,
        NetworkSummaryLiveStreamModule,
        ChartCompareWidgetModule,
        // DropdownMenuModule,
        SortablejsModule,
        CustomCheckboxModule,
        CustomSwitchModule,
        UiSvgIconModule,
        SharedModule,
        RouterModule
    ],
    exports: [NetworkSummaryWidgetComponent]
})
export class NetworkSummaryWidgetModule {}
