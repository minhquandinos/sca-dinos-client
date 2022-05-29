import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { GETTING_STARTED_PROVIDER } from '@scaleo/feature/manager/getting-started/data-access';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ScheduleCallModule } from './components/schedule-call/schedule-call.module';
import { GettingStartedPagesComponent } from './getting-started-pages.component';
import { ManagerGettingStartedPagesRoutingModule } from './manager-getting-started-pages-routing.module';

@NgModule({
    declarations: [GettingStartedPagesComponent],
    imports: [
        CommonModule,
        UiSvgIconModule,
        SharedModule,
        RouterModule,
        ScheduleCallModule,
        UiButtonLinkModule,
        ManagerGettingStartedPagesRoutingModule
    ],
    providers: [GETTING_STARTED_PROVIDER]
})
export class ManagerGettingStartedPagesModule {}
