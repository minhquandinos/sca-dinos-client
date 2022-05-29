import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CreativePreviewModule } from '@scaleo/offer-creative-shared-components-preview';
import { CreativeViewHtmlCodeDirectiveModule } from '@scaleo/feature/manager/offer/creative/shared/directives/view-html-code';
import { CreativeHtmlCodeConvertPipeModule } from '@scaleo/feature/manager/offer/creative/shared/pipes/html-code-convert';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import {
    CustomPaginationModule,
    FieldTextInfoModule,
    FiltersModule,
    LinkToModalInfoModule,
    StatusDotColorModule,
    TextareaModule
} from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { FileSizeFormatModule } from '@scaleo/shared/pipes';
import { CardModule, TableNavigationModule, UiButtonLinkModule, UiChipModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { OfferConfigCreativesListComponent } from './components/offer-config-creatives-list/offer-config-creatives-list.component';
import { OfferConfigCreativesComponent } from './offer-config-creatives.component';

@NgModule({
    declarations: [OfferConfigCreativesComponent, OfferConfigCreativesListComponent],
    imports: [
        CommonModule,
        CardModule,
        SharedModule,
        UiButtonLinkModule,
        FiltersModule,
        CustomPaginationModule,
        FindPlatformStatusesModule,
        UiTable2Module,
        StatusDotColorModule,
        PlatformFormatPipeModule,
        UiChipModule,
        CreativePreviewModule,
        TextareaModule,
        TableNavigationModule,
        FieldTextInfoModule,
        PlatformListTranslateModule,
        FileSizeFormatModule,
        CreativeViewHtmlCodeDirectiveModule,
        LinkToModalInfoModule,
        CreativeHtmlCodeConvertPipeModule
    ],
    exports: [OfferConfigCreativesComponent]
})
export class OfferConfigCreativesModule {}
