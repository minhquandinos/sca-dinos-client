import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { FilledLineModule, HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { ChangeColorOfNumberModule } from '@scaleo/shared/directives';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { TopOfferListComponent } from './components/top-offer/top-offer-list.component';

@NgModule({
    declarations: [TopOfferListComponent],
    imports: [
        CommonModule,
        UiTableModule,
        UiSkeletonModule,
        RouterModule,
        ChangeColorOfNumberModule,
        PlatformFormatPipeModule,
        UiButtonLinkModule,
        SharedModule,
        FilledLineModule,
        HyperlinkModule,
        NavigateRootModule,
        PregMatchPipeModule
    ],
    exports: [TopOfferListComponent]
})
export class TopOfferListModule {}
