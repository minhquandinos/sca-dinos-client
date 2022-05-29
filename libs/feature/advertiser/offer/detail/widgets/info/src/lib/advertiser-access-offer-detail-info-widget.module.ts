import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { DetailInfoWidgetModule, ExpandModule, StatusDotColorModule, TagsListModule, TextareaModule } from '@scaleo/shared/components';
import { DefaultImageModule } from '@scaleo/shared/pipes';
import { PathFilePipeModule } from '@scaleo/shared/services/path-file';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AdvertiserAccessOfferDetailInfoWidgetComponent } from './advertiser-access-offer-detail-info-widget.component';

@NgModule({
    declarations: [AdvertiserAccessOfferDetailInfoWidgetComponent],
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
        PathFilePipeModule,
        PlatformFormatPipeModule,
        StatusDotColorModule
    ],
    exports: [AdvertiserAccessOfferDetailInfoWidgetComponent]
})
export class AdvertiserAccessOfferDetailInfoWidgetModule {}
