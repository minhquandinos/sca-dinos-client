import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { NavigateRootModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiDividerModule, UiSimpleTableModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { BalanceWidgetComponent } from './balance-widget.component';
import { BalanceListComponent } from './components/balance-list/balance-list.component';
import { BalanceStatusComponent } from './components/balance-status/balance-status.component';

@NgModule({
    declarations: [BalanceWidgetComponent, BalanceStatusComponent, BalanceListComponent],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        ContainerWidgetModule,
        SharedModule,
        RouterModule,
        UiTableModule,
        PlatformFormatPipeModule,
        UiSkeletonModule,
        UiSimpleTableModule,
        UiDividerModule,
        PlatformStatusesModule,
        NavigateRootModule
    ]
})
export class BalanceWidgetModule {}
