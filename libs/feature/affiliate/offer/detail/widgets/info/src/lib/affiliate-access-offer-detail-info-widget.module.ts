import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DetailInfoWidgetModule, ExpandModule, TagsListModule, TextareaModule } from '@scaleo/shared/components';
import { DefaultImageModule } from '@scaleo/shared/pipes';
import { PathFilePipeModule } from '@scaleo/shared/services/path-file';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateAccessOfferDetailInfoWidgetComponent } from './affiliate-access-offer-detail-info-widget.component';

@NgModule({
    declarations: [AffiliateAccessOfferDetailInfoWidgetComponent],
    imports: [
        CommonModule,
        DetailInfoWidgetModule,
        SharedModule,
        DefaultImageModule,
        UiButtonLinkModule,
        DetailInfoModule,
        TagsListModule,
        ExpandModule,
        TextareaModule,
        PathFilePipeModule
    ],
    exports: [AffiliateAccessOfferDetailInfoWidgetComponent]
})
export class AffiliateAccessOfferDetailInfoWidgetModule {}
