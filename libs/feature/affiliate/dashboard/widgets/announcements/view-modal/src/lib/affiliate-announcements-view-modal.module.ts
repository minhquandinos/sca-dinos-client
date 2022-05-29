import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule, ExpandModule, NavigateRootModule } from '@scaleo/shared/components';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import {
    UiButtonLinkModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { AffiliateAnnouncementsViewModalComponent } from './affiliate-announcements-view-modal.component';

@NgModule({
    declarations: [AffiliateAnnouncementsViewModalComponent],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        SharedModule,
        UiTableModule,
        UiSkeletonModule,
        DateVariantModule,
        UiImageModule,
        PlatformFormatPipeModule,
        RouterModule,
        UiSvgIconModule,
        ExpandModule,
        InfiniteScrollModule,
        StopPropagationDirectiveModule,
        PregMatchPipeModule,
        UiButtonLinkModule,
        Modal3EditFormModule,
        NavigateRootModule
    ],
    exports: [AffiliateAnnouncementsViewModalComponent]
})
export class AffiliateAnnouncementsViewModalModule {}
