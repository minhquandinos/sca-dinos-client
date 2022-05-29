import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateUpsertModalFormModule } from '@scaleo/feature/manager/affiliate/upsert/modal-form';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportFieldInsightsModule } from '@scaleo/reports/shared/format-fields';
import {
    CustomInfoModule,
    CustomPaginationModule,
    CustomSearchModule,
    DateVariantModule,
    HintCreateFirstItemModule,
    ManagerListModule,
    ModalExportModule,
    OutputSelectedFiltersModule,
    StatusDotColorModule,
    TableConversionModule,
    TagsListModule
} from '@scaleo/shared/components';
import { ContactListIconModule } from '@scaleo/shared/components/contact';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiBadgesModule,
    UiButtonLinkModule,
    UiChipModule,
    UiImageModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { AffiliatesComponent } from './affiliates.component';
import { AffiliatesListFiltersModule } from './components/filters/affiliates-list-filters.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CustomPaginationModule,
        ManagerAffiliateUpsertModalFormModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        UiImageModule,
        CustomInfoModule,
        UiSvgIconModule,
        TagsListModule,
        OutputSelectedFiltersModule,
        ManagerListModule,
        DateVariantModule,
        ContactListIconModule,
        UiChipModule,
        UiImageModule,
        UiBadgesModule,
        HintCreateFirstItemModule,
        TableConversionModule,
        PlatformFormatPipeModule,
        ReportFieldInsightsModule,
        AffiliatesListFiltersModule,
        UiTable2Module,
        TableNavigationModule,
        IsTruthyModule,
        StatusDotColorModule,
        ModalExportModule,
        CustomSearchModule,
        RouterModule
    ],
    declarations: [AffiliatesComponent],
    exports: [AffiliatesComponent]
})
export class FeatureManagerAffiliateListComponentModule {}
