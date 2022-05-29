import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomDateRangeModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { DashboardToolbarComponent } from './dashboard-toolbar.component';
import { DashboardToolbarEditComponent } from './dashboard-toolbar-edit.component';
import { DashboardToolbarViewComponent } from './dashboard-toolbar-view.component';

@NgModule({
    declarations: [DashboardToolbarComponent, DashboardToolbarEditComponent, DashboardToolbarViewComponent],
    imports: [UiButtonLinkModule, SharedModule, UiSvgIconModule, CustomDateRangeModule],
    exports: [DashboardToolbarComponent]
})
export class DashboardToolbarModule {}
