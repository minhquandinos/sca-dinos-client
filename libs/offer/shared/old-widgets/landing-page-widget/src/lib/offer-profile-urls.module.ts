import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { StringLengthModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { OfferProfileUrlsComponent } from './offer-profile-urls.component';

@NgModule({
    declarations: [OfferProfileUrlsComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        UiTableModule,
        RouterModule,
        UiChipModule,
        UiPageWrapperModule,
        StringLengthModule,
        PlatformFormatPipeModule,
        PlatformListTranslateModule
    ],
    exports: [OfferProfileUrlsComponent]
})
export class OfferProfileUrlsModule {}
