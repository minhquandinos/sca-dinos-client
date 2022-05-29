import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostbackLevelNamePipeModule } from '@scaleo/affiliate/postback/shared/pipes/level-name';
import { SharedModule } from '@scaleo/core/shared/module';
import { AffiliatePostbacksUpsertModalFormModule } from '@scaleo/feature/affiliate/tools/postbacks/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CardWidgetModule, ConversionStatusModule, FieldTextInfoModule, StatusDotColorModule } from '@scaleo/shared/components';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiSimpleTableModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { AffiliateOfferProfilePostbacksComponent } from './affiliate-offer-profile-postbacks.component';

@NgModule({
    declarations: [AffiliateOfferProfilePostbacksComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        UiTableModule,
        RouterModule,
        UiChipModule,
        AffiliatePostbacksUpsertModalFormModule,
        CardWidgetModule,
        UiSimpleTableModule,
        StatusDotColorModule,
        TruncateTextPipeModule,
        PlatformFormatPipeModule,
        ConversionStatusModule,
        FieldTextInfoModule,
        PostbackLevelNamePipeModule
    ],
    exports: [AffiliateOfferProfilePostbacksComponent]
})
export class AffiliateOfferProfilePostbacksModule {}
