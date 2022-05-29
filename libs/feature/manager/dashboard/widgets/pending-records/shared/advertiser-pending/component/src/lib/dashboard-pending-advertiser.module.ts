import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DateVariantModule, HyperlinkModule } from '@scaleo/shared/components';
import { ConfigCustomFieldService } from '@scaleo/shared/data-access/custom-fields';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiPageWrapperModule,
    UiSimpleTableModule,
    UiSkeletonModule
} from '@scaleo/ui-kit/elements';

import { DashboardPendingAdvertiserComponent } from './dashboard-pending-advertiser.component';

@NgModule({
    declarations: [DashboardPendingAdvertiserComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiSimpleTableModule,
        UiSkeletonModule,
        DateVariantModule,
        UiButtonLinkModule,
        RouterModule,
        UiPageWrapperModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        TableNavigationModule
    ],
    exports: [DashboardPendingAdvertiserComponent],
    providers: [ConfigCustomFieldService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'adv_custom_fields' }]
})
export class DashboardPendingAdvertiserModule {}
