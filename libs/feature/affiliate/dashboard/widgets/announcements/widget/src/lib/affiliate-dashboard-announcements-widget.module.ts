import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ContainerWidgetModule } from '@scaleo/dashboard/shared/components/container-widget';
import { AffiliateAnnouncementsViewModalModule } from '@scaleo/feature/affiliate/dashboard/widgets/announcements/view-modal';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule } from '@scaleo/shared/components';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import {
    UiButtonLinkModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { AnnouncementsWidgetComponent } from './announcements-widget.component';

@NgModule({
    declarations: [AnnouncementsWidgetComponent],
    imports: [
        CommonModule,
        SharedModule,
        ContainerWidgetModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        UiTableModule,
        UiSvgIconModule,
        RouterModule,
        UiImageModule,
        PlatformFormatPipeModule,
        DateVariantModule,
        AffiliateAnnouncementsViewModalModule,
        StopPropagationDirectiveModule,
        PregMatchPipeModule
    ],
    exports: [AnnouncementsWidgetComponent]
})
export class AffiliateDashboardAnnouncementsWidgetModule {}
