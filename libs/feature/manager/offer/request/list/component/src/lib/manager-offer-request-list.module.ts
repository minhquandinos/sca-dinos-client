import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerOfferRequestSolveControlModule } from '@scaleo/feature/manager/offer/request/solve/control';
import { ManagerOfferRequestSolveModalViewAnswerModule } from '@scaleo/feature/manager/offer/request/solve/modal-view-answer';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import {
    CustomPaginationModule,
    DropdownPopupModule,
    FieldTextInfoModule,
    FiltersModule,
    HyperlinkModule,
    ManagerChipModule,
    NavigateRootModule,
    OutputSelectedFiltersModule
} from '@scaleo/shared/components';
import { FindAffiliatesModule, FindOfferModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { DefaultImageModule, TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiDividerModule, UiSvgIconModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { OfferRequestLogComponent } from './components/offer-request-log.component';
import { OffersRequestsFiltersComponent } from './components/offers-requests-filters/offers-requests-filters.component';
import { OffersRequestsComponent } from './offers-requests.component';

@NgModule({
    declarations: [OffersRequestsComponent, OfferRequestLogComponent, OffersRequestsFiltersComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiTable2Module,
        CustomPaginationModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        UiButtonLinkModule,
        SharedModule,
        ManagerOfferRequestSolveControlModule,
        UiSvgIconModule,
        ManagerChipModule,
        PlatformStatusesModule,
        NavigateRootModule,
        FiltersModule,
        DropdownPopupModule,
        FindOfferModule,
        FindPlatformListModule,
        OutputSelectedFiltersModule,
        FindAffiliatesModule,
        UiDividerModule,
        FieldTextInfoModule,
        ManagerOfferRequestSolveModalViewAnswerModule,
        DefaultImageModule,
        TruncateTextPipeModule
    ]
})
export class ManagerOfferRequestListModule {}
