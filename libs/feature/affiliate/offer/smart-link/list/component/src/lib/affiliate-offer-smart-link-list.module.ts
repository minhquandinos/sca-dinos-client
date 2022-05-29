import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SmartLinkLinkBuilderModule } from '@scaleo/offer/link-builder/smart-link';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { AllowedTagsModule, CustomPaginationModule, FiltersModule, TagsListModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { UiButtonLinkModule, UiImageModule, UiSkeletonModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { AffiliateSmartLinksComponent } from './affiliate-smart-links.component';
import { AffiliateSmartLinksFiltersComponent } from './components/smart-links-filters/affiliate-smart-links-filters.component';

@NgModule({
    declarations: [AffiliateSmartLinksComponent, AffiliateSmartLinksFiltersComponent],
    imports: [
        CommonModule,
        UiTable2Module,
        UiImageModule,
        TagsListModule,
        SharedModule,
        PlatformFormatPipeModule,
        FiltersModule,
        FindPlatformStatusesModule,
        UiButtonLinkModule,
        CustomPaginationModule,
        UiSkeletonModule,
        AllowedTagsModule,
        SmartLinkLinkBuilderModule
    ],
    exports: [AffiliateSmartLinksComponent]
})
export class AffiliateOfferSmartLinkListModule {}
