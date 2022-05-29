import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindCountryModule, FindManagersModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { AdvertisersListFiltersComponent } from './advertisers-list-filters.component';

@NgModule({
    declarations: [AdvertisersListFiltersComponent],
    exports: [AdvertisersListFiltersComponent],
    imports: [
        CommonModule,
        SharedModule,
        OutputSelectedFiltersModule,
        DropdownPopupModule,
        FindManagersModule,
        FindCountryModule,
        UiChipModule,
        FindPlatformListModule,
        FindPlatformStatusesModule,
        FiltersModule
    ]
})
export class AdvertisersListFiltersModule {}
