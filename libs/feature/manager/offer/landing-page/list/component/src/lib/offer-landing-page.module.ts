import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferLandingPageAffiliatesVisibilityModule } from '@scaleo/feature/manager/offer/landing-page/shared/components/affiliates-visibility';
import { OfferLandingPageUpsertModule } from '@scaleo/feature/manager/offer/landing-page/upsert/modal-form';
import { OfferTargetingListModule } from '@scaleo/offer/shared/fields/offer-targeting-list';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { CustomPaginationModule, FiltersModule, StatusDotColorModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { CardModule, TableNavigationModule, UiButtonLinkModule, UiChipModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { OfferLandingPageListComponent } from './components/offer-landing-page-list/offer-landing-page-list.component';
import { OfferLandingPageComponent } from './offer-landing-page.component';

@NgModule({
    declarations: [OfferLandingPageComponent, OfferLandingPageListComponent],
    imports: [
        CommonModule,
        CardModule,
        SharedModule,
        UiButtonLinkModule,
        CustomPaginationModule,
        FiltersModule,
        FindPlatformStatusesModule,
        UiTable2Module,
        TableNavigationModule,
        StatusDotColorModule,
        PlatformFormatPipeModule,
        UiChipModule,
        PlatformListTranslateModule,
        OfferTargetingListModule,
        OfferLandingPageUpsertModule,
        OfferLandingPageAffiliatesVisibilityModule
    ]
})
export class OfferLandingPageModule {}
