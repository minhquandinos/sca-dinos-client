import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule, HyperlinkModule } from '@scaleo/shared/components';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiPageWrapperModule,
    UiSimpleTableModule,
    UiSkeletonModule
} from '@scaleo/ui-kit/elements';

import { DashboardPendingAffiliateComponent } from './dashboard-pending-affiliate.component';

@NgModule({
    declarations: [DashboardPendingAffiliateComponent],
    exports: [DashboardPendingAffiliateComponent],
    imports: [
        CommonModule,
        UiSimpleTableModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        DateVariantModule,
        RouterModule,
        SharedModule,
        UiPageWrapperModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        TableNavigationModule
    ]
})
export class DashboardPendingAffiliateModule {}
