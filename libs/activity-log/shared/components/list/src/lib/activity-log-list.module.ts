import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActivityModule } from '@scaleo/activity-log/shared/components/activity';
import { ActivityLogUserModule } from '@scaleo/activity-log/shared/components/activity-log-user';
import { SharedModule } from '@scaleo/core/shared/module';
import {
    CountryFlagModule,
    CustomDateRangeModule,
    CustomPaginationModule,
    CustomSearchModule,
    DateVariantModule,
    DropdownListModule,
    DropdownPopupModule,
    FiltersModule,
    ManagerListModule,
    OutputSelectedFiltersModule
} from '@scaleo/shared/components';
import { FindManagersModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import {
    UiChipModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { ActivityLogListComponent } from './activity-log-list.component';

@NgModule({
    declarations: [ActivityLogListComponent],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        CustomDateRangeModule,
        CustomPaginationModule,
        FiltersModule,
        CustomSearchModule,
        UiTableModule,
        DropdownPopupModule,
        FindManagersModule,
        SelectModule,
        OutputSelectedFiltersModule,
        DropdownListModule,
        UiSkeletonModule,
        UiSvgIconModule,
        DateVariantModule,
        ManagerListModule,
        ActivityModule,
        UiChipModule,
        UiImageModule,
        ActivityLogUserModule,
        CountryFlagModule,
        CustomTranslatePipeModule,
        UiPageWrapperModule
    ],
    exports: [ActivityLogListComponent, UiTableModule]
})
export class ActivityLogListModule {}
