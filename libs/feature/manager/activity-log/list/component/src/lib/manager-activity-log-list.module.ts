import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivityModule } from '@scaleo/activity-log/shared/components/activity';
import { ActivityLogUserModule } from '@scaleo/activity-log/shared/components/activity-log-user';
import { ActivityLogListModule } from '@scaleo/activity-log/shared/components/list';
import { SharedModule } from '@scaleo/core/shared/module';
import {
    CountryFlagModule,
    CustomDateRangeModule,
    DateVariantModule,
    DropdownPopupModule,
    FiltersModule,
    OutputSelectedFiltersModule
} from '@scaleo/shared/components';
import { FindManagersModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ManagerActivityListComponent } from './manager-activity-list.component';

@NgModule({
    declarations: [ManagerActivityListComponent],
    imports: [
        CommonModule,
        ActivityLogListModule,
        FiltersModule,
        SharedModule,
        DropdownPopupModule,
        FindManagersModule,
        FindPlatformListModule,
        OutputSelectedFiltersModule,
        UiSvgIconModule,
        CountryFlagModule,
        ActivityModule,
        ActivityLogUserModule,
        DateVariantModule,
        CustomDateRangeModule
    ],
    exports: [ManagerActivityListComponent]
})
export class ManagerActivityLogListModule {}
