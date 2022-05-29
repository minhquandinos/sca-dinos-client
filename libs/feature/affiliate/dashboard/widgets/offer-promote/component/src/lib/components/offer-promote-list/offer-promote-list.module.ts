import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { GoalsListModule } from '@scaleo/offer/shared/fields/goals-list';
import { OfferVisibilityAffiliateAccessModule } from '@scaleo/offer/shared/fields/offer-visibility-affiliate-access';
import { TargetingLinkBuilderModule } from '@scaleo/offer/targeting-link-builder/modal-form';
import {
    UiButtonGroupModule,
    UiButtonLinkModule,
    UiImageModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { OfferPromoteActionsComponent } from './offer-promote-actions.component';
import { OfferPromoteListComponent } from './offer-promote-list.component';

@NgModule({
    declarations: [OfferPromoteListComponent, OfferPromoteActionsComponent],
    imports: [
        CommonModule,
        UiTableModule,
        GoalsListModule,
        UiSvgIconModule,
        SharedModule,
        UiImageModule,
        RouterModule,
        UiSkeletonModule,
        TargetingLinkBuilderModule,
        UiButtonLinkModule,
        UiButtonGroupModule,
        OfferVisibilityAffiliateAccessModule
    ],
    exports: [OfferPromoteListComponent]
})
export class OfferPromoteListModule {}
