import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutosizeModule } from 'ngx-autosize';

import { SharedModule } from '@scaleo/core/shared/module';
import { CreativePreviewModule } from '@scaleo/offer-creative-shared-components-preview';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { OfferProfileCreativesComponent } from './offer-profile-creatives.component';
import { OfferProfileCreativesService } from './offer-profile-creatives.service';
import { CreativeTypeIsXmlFeedPipe } from './pipes/creative-type-is-xml-feed.pipe';
import { CreativeTypeTitlePipe } from './pipes/creative-type-title.pipe';

@NgModule({
    declarations: [OfferProfileCreativesComponent, CreativeTypeIsXmlFeedPipe, CreativeTypeTitlePipe],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        UiTableModule,
        RouterModule,
        UiChipModule,
        AutosizeModule,
        UiPageWrapperModule,
        FieldTextInfoModule,
        CreativePreviewModule,
        PlatformFormatPipeModule,
        StopPropagationDirectiveModule
    ],
    providers: [OfferProfileCreativesService],
    exports: [OfferProfileCreativesComponent, CreativeTypeTitlePipe]
})
export class OfferProfileCreativesModule {}
