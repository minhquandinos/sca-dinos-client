import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivityLogWidgetItemsModule } from '@scaleo/activity-log/shared/components/short-items';
import { SharedModule } from '@scaleo/core/shared/module';
import { CardWidgetModule, ContainerShadowModule, CustomPaginationModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ActivityLogEntityDetailWidgetComponent } from './activity-log-entity-detail-widget.component';

@NgModule({
    declarations: [ActivityLogEntityDetailWidgetComponent],
    exports: [ActivityLogEntityDetailWidgetComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        ContainerShadowModule,
        CardWidgetModule,
        ActivityLogWidgetItemsModule,
        CustomPaginationModule
    ]
})
export class ActivityLogEntityDetailWidgetModule {}
