import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { FiltersModule, ManagerListModule, NavigateRootModule } from '@scaleo/shared/components';
import { FindManagersModule } from '@scaleo/shared/components/find';
import { ChangeColorOfNumberModule } from '@scaleo/shared/directives';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiTableModule, UiTabNavBarModule } from '@scaleo/ui-kit/elements';

import { MgcomTopComponent } from './mgcom-top.component';

@NgModule({
    declarations: [MgcomTopComponent],
    imports: [
        CommonModule,
        SharedModule,
        ContainerWidgetModule,
        RouterModule,
        FiltersModule,
        FindManagersModule,
        InfiniteScrollModule,
        UiTableModule,
        PlatformFormatPipeModule,
        ManagerListModule,
        UiButtonLinkModule,
        ChangeColorOfNumberModule,
        UiTabNavBarModule,
        PregMatchPipeModule,
        NavigateRootModule
    ],
    exports: [MgcomTopComponent]
})
export class MgcomTopModule {}
