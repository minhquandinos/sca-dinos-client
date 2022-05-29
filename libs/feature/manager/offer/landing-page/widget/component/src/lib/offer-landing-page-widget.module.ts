import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferLandingPageAffiliatesVisibilityModule } from '@scaleo/feature/manager/offer/landing-page/shared/components/affiliates-visibility';
import { OfferLandingPageUpsertModule } from '@scaleo/feature/manager/offer/landing-page/upsert/modal-form';
import { OfferTargetingListModule } from '@scaleo/offer/shared/fields/offer-targeting-list';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { CardWidgetModule, CustomPaginationModule, StatusDotColorModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiButtonLinkModule, UiChipModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { OfferLandingPageWidgetComponent } from './offer-landing-page-widget.component';

@NgModule({
    declarations: [OfferLandingPageWidgetComponent],
    exports: [OfferLandingPageWidgetComponent],
    imports: [
        CommonModule,
        CardWidgetModule,
        SharedModule,
        UiButtonLinkModule,
        UiSimpleTableModule,
        StatusDotColorModule,
        TableNavigationModule,
        OfferTargetingListModule,
        OfferLandingPageAffiliatesVisibilityModule,
        RouterModule,
        UiChipModule,
        PlatformFormatPipeModule,
        PlatformListTranslateModule,
        OfferLandingPageUpsertModule,
        CustomPaginationModule
    ]
})
export class OfferLandingPageWidgetModule {}
