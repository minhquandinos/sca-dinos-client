import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostbackLevelNamePipeModule } from '@scaleo/affiliate/postback/shared/pipes/level-name';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    CardWidgetModule,
    ConversionStatusModule,
    FieldTextInfoModule,
    HyperlinkModule,
    NavigateRootModule,
    StatusDotColorModule
} from '@scaleo/shared/components';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSimpleTableModule, UiStatusDotModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { ManagerAffiliatePostbackWidgetComponent } from './manager-affiliate-postback-widget.component';

@NgModule({
    declarations: [ManagerAffiliatePostbackWidgetComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiTableModule,
        UiButtonLinkModule,
        RouterModule,
        FieldTextInfoModule,
        UiSimpleTableModule,
        PlatformFormatPipeModule,
        NavigateRootModule,
        UiStatusDotModule,
        StatusDotColorModule,
        NavigateRootModule,
        CardWidgetModule,
        TruncateTextPipeModule,
        ConversionStatusModule,
        PostbackLevelNamePipeModule,
        HyperlinkModule
    ],
    exports: [ManagerAffiliatePostbackWidgetComponent]
})
export class ManagerAffiliatePostbackWidgetModule {}
