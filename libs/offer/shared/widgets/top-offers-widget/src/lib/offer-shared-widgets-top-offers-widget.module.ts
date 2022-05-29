import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { NavigateRootModule } from '@scaleo/shared/components';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { TopOffersWidgetComponent } from './top-offers-widget.component';

@NgModule({
    declarations: [TopOffersWidgetComponent],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        SharedModule,
        RouterModule,
        PlatformFormatPipeModule,
        NavigateRootModule,
        PregMatchPipeModule,
        UiSimpleTableModule
    ],
    exports: [TopOffersWidgetComponent]
})
export class OfferSharedWidgetsTopOffersWidgetModule {}
