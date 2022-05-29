import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerOfferDuplicateModule } from '@scaleo/feature/manager/offer/duplicate/component';
import { GoalsListModule } from '@scaleo/offer/shared/fields/goals-list';
import { OfferTargetingListModule } from '@scaleo/offer/shared/fields/offer-targeting-list';
import { OfferVisibilityModule } from '@scaleo/offer/shared/fields/offer-visibility';
import { OfferVisibilityAffiliateAccessModule } from '@scaleo/offer/shared/fields/offer-visibility-affiliate-access';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoModule, TableConversionModule, TagsListModule } from '@scaleo/shared/components';
import { IsEmptyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiImageModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { AdvertiserOfferListComponent } from './advertiser-offer-list.component';

@NgModule({
    declarations: [AdvertiserOfferListComponent],
    imports: [
        CommonModule,
        UiSkeletonModule,
        UiStatusColorModule,
        UiImageModule,
        UiSvgIconModule,
        OfferVisibilityModule,
        SharedModule,
        PlatformFormatPipeModule,
        GoalsListModule,
        UiButtonLinkModule,
        CustomInfoModule,
        TableConversionModule,
        OfferTargetingListModule,
        TagsListModule,
        RouterModule,
        UiTable2Module,
        TableNavigationModule,
        ManagerOfferDuplicateModule,
        IsEmptyModule,
        OfferVisibilityAffiliateAccessModule
    ],
    exports: [AdvertiserOfferListComponent]
})
export class AdvertiserOfferListModule {}
