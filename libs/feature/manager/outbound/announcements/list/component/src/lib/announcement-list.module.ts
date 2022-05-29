import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AnnouncementsEditModule } from '@scaleo/feature/manager/outbound/announcements/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    CustomPaginationModule,
    CustomSearchModule,
    DateVariantModule,
    FiltersModule,
    HyperlinkModule,
    ManagerListModule,
    NavigateRootModule
} from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { AnnouncementListComponent } from './announcement-list.component';

@NgModule({
    declarations: [AnnouncementListComponent],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        FiltersModule,
        SharedModule,
        CustomPaginationModule,
        UiSkeletonModule,
        UiStatusColorModule,
        UiImageModule,
        PlatformFormatPipeModule,
        DateVariantModule,
        ManagerListModule,
        UiSvgIconModule,
        CustomSearchModule,
        AnnouncementsEditModule,
        PregMatchPipeModule,
        FindPlatformStatusesModule,
        UiTable2Module,
        UiPageWrapperModule,
        TableNavigationModule,
        HyperlinkModule,
        NavigateRootModule
    ],
    exports: [AnnouncementListComponent]
})
export class AnnouncementListModule {}
