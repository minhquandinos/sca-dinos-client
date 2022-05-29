import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivityModule } from '@scaleo/activity-log/shared/components/activity';
import { ActivityLogUserModule } from '@scaleo/activity-log/shared/components/activity-log-user';
import { SharedModule } from '@scaleo/core/shared/module';
import { DateVariantModule } from '@scaleo/shared/components';
import { UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { ActivityLogWidgetItemsComponent } from './activity-log-widget-items.component';

@NgModule({
    declarations: [ActivityLogWidgetItemsComponent],
    exports: [ActivityLogWidgetItemsComponent],
    imports: [CommonModule, UiSimpleTableModule, DateVariantModule, ActivityLogUserModule, SharedModule, ActivityModule]
})
export class ActivityLogWidgetItemsModule {}
