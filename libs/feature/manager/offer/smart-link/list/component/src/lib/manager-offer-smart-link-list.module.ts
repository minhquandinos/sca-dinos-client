import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerOfferSmartLinkUpsertModalFormModule } from '@scaleo/feature/manager/offer/smart-link/upsert/modal-form';
import { SmartLinkLinkBuilderModule } from '@scaleo/offer/link-builder/smart-link';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { AllowedTagsModule, CustomPaginationModule, FiltersModule, TagsListModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiImageModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { AvailableSmartLinkComponent } from './components/available-smart-link/available-smart-link.component';
import { SmartLinksFiltersComponent } from './components/smart-links-filters/smart-links-filters.component';
import { ShowDividerInSmartLinksTableNavDirective } from './directives/show-divider-in-smart-links-table-nav.directive';
import { SmartLinksComponent } from './smart-links.component';

@NgModule({
    declarations: [SmartLinksComponent, AvailableSmartLinkComponent, SmartLinksFiltersComponent, ShowDividerInSmartLinksTableNavDirective],
    imports: [
        CommonModule,
        RouterModule,
        UiTable2Module,
        TableNavigationModule,
        CustomPaginationModule,
        PlatformFormatPipeModule,
        UiStatusColorModule,
        UiImageModule,
        SharedModule,
        TagsListModule,
        AllowedTagsModule,
        ManagerOfferSmartLinkUpsertModalFormModule,
        IsTruthyModule,
        FiltersModule,
        UiSkeletonModule,
        UiButtonLinkModule,
        SharedModule,
        FindPlatformStatusesModule,
        SmartLinkLinkBuilderModule
    ]
})
export class ManagerOfferSmartLinkListModule {}
