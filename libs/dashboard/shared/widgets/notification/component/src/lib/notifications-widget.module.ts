import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActivityLogWidgetItemsModule } from '@scaleo/activity-log/shared/components/short-items';
import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { NavigateRootModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { NotificationsWidgetComponent } from './notifications-widget.component';

@NgModule({
    declarations: [NotificationsWidgetComponent],
    imports: [
        CommonModule,
        ContainerWidgetModule,
        UiButtonLinkModule,
        SharedModule,
        RouterModule,
        ActivityLogWidgetItemsModule,
        NavigateRootModule
    ],
    exports: [NotificationsWidgetComponent]
})
export class NotificationsWidgetModule {}
