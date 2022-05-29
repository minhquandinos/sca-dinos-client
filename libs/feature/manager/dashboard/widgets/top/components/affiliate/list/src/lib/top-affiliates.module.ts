import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { FilledLineModule, HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { ChangeColorOfNumberModule } from '@scaleo/shared/directives';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { TopAffiliatesComponent } from './components/top-affiliates/top-affiliates.component';

@NgModule({
    declarations: [TopAffiliatesComponent],
    imports: [
        CommonModule,
        UiTableModule,
        UiSkeletonModule,
        FilledLineModule,
        ChangeColorOfNumberModule,
        PlatformFormatPipeModule,
        SharedModule,
        NavigateRootModule,
        UiButtonLinkModule,
        HyperlinkModule,
        PregMatchPipeModule
    ],
    exports: [TopAffiliatesComponent]
})
export class TopAffiliatesModule {}
