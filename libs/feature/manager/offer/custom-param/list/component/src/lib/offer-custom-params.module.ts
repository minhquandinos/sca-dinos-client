import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferCustomParamsConditionsListItemModule } from '@scaleo/feature/manager/offer/custom-param/shared/components/condition-list-item';
import { OfferCustomParamsParametersListItemModule } from '@scaleo/feature/manager/offer/custom-param/shared/components/parameter-list-item';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    CustomPaginationModule,
    DateVariantModule,
    FiltersModule,
    NavigateRootModule,
    ShortListColumnModule,
    StatusDotColorModule
} from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { CardModule, TableNavigationModule, UiButtonLinkModule, UiChipModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { OfferCustomParamsListComponent } from './components/offer-custom-params-list/offer-custom-params-list.component';
import { OfferCustomParamsComponent } from './offer-custom-params.component';

@NgModule({
    declarations: [OfferCustomParamsComponent, OfferCustomParamsListComponent],
    imports: [
        CommonModule,
        CardModule,
        SharedModule,
        UiButtonLinkModule,
        FiltersModule,
        FindPlatformStatusesModule,
        CustomPaginationModule,
        UiTable2Module,
        TableNavigationModule,
        StatusDotColorModule,
        DateVariantModule,
        UiChipModule,
        PlatformFormatPipeModule,
        ShortListColumnModule,
        RouterModule,
        NavigateRootModule,
        OfferCustomParamsParametersListItemModule,
        OfferCustomParamsConditionsListItemModule
    ]
})
export class OfferCustomParamsModule {}
