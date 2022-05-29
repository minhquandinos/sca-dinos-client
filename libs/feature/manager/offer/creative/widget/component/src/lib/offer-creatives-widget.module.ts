import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { CreativeViewHtmlCodeDirectiveModule } from '@scaleo/feature/manager/offer/creative/shared/directives/view-html-code';
import { CreativeHtmlCodeConvertPipeModule } from '@scaleo/feature/manager/offer/creative/shared/pipes/html-code-convert';
import { ManagerOfferCreativeUpsertModule } from '@scaleo/feature/manager/offer/creative/upsert/modal-form';
import { CreativePreviewModule } from '@scaleo/offer-creative-shared-components-preview';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import {
    CardWidgetModule,
    CustomPaginationModule,
    FieldTextInfoModule,
    LinkToModalInfoModule,
    StatusDotColorModule,
    TextareaModule
} from '@scaleo/shared/components';
import { FileSizeFormatModule } from '@scaleo/shared/pipes';
import { TableNavigationModule, UiButtonLinkModule, UiChipModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { OfferCreativesWidgetComponent } from './offer-creatives-widget.component';

@NgModule({
    declarations: [OfferCreativesWidgetComponent],
    imports: [
        CommonModule,
        CardWidgetModule,
        SharedModule,
        UiButtonLinkModule,
        RouterModule,
        TableNavigationModule,
        UiSimpleTableModule,
        StatusDotColorModule,
        PlatformFormatPipeModule,
        UiChipModule,
        CreativePreviewModule,
        FieldTextInfoModule,
        TextareaModule,
        ManagerOfferCreativeUpsertModule,
        PlatformListTranslateModule,
        CreativeViewHtmlCodeDirectiveModule,
        FileSizeFormatModule,
        LinkToModalInfoModule,
        CreativeHtmlCodeConvertPipeModule,
        CustomPaginationModule
    ],
    exports: [OfferCreativesWidgetComponent]
})
export class OfferCreativesWidgetModule {}
