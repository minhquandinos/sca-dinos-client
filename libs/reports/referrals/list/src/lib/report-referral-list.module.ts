import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    CustomDateRangeModule,
    CustomPaginationModule,
    HyperlinkModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiPageWrapperModule, UiSkeletonModule, UiTable2Module, UiTableModule } from '@scaleo/ui-kit/elements';

import { ReportReferralListComponent } from './report-referral-list.component';

@NgModule({
    declarations: [ReportReferralListComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        CustomDateRangeModule,
        UiTableModule,
        UiTable2Module,
        CustomPaginationModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        ReportLastUpdatedModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        PregMatchPipeModule,
        ResultCountModule
    ],
    exports: [ReportReferralListComponent]
})
export class ReportReferralListModule {}
