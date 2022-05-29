import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerOfferDuplicateModule } from '@scaleo/feature/manager/offer/duplicate/component';
import { OfferTrackingLinkModule } from '@scaleo/feature/manager/offer/tracking/link/view-info/component';
import { OfferTrackingSettingsModule } from '@scaleo/feature/manager/offer/tracking/settings/view-info/component';
import { OfferUpsertModule } from '@scaleo/feature/manager/offer/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    AdvertiserChipModule,
    DetailInfoWidgetModule,
    ExpandModule,
    QuickLinksModule,
    StatusDotColorModule,
    TagsListModule
} from '@scaleo/shared/components';
import { DefaultImageModule } from '@scaleo/shared/pipes';
import { DetailInfoModule, UiButtonLinkModule, UiDividerModule } from '@scaleo/ui-kit/elements';

import { OfferDetailWidgetQuickLinksComponent } from './components/offer-detail-widget-quick-links/offer-detail-widget-quick-links.component';
import { OfferDetailWidgetComponent } from './offer-detail-widget.component';

@NgModule({
    declarations: [OfferDetailWidgetComponent, OfferDetailWidgetQuickLinksComponent],
    imports: [
        CommonModule,
        QuickLinksModule,
        SharedModule,
        ExpandModule,
        AdvertiserChipModule,
        PlatformFormatPipeModule,
        UiButtonLinkModule,
        ManagerOfferDuplicateModule,
        DetailInfoWidgetModule,
        DefaultImageModule,
        StatusDotColorModule,
        DetailInfoModule,
        TagsListModule,
        OfferUpsertModule,
        UiDividerModule,
        OfferTrackingLinkModule,
        OfferTrackingSettingsModule
    ],
    exports: [OfferDetailWidgetComponent],
    providers: []
})
export class OfferDetailWidgetModule {}
