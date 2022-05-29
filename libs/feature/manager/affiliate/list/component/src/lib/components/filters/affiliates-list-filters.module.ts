import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindCountryModule, FindManagersModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';

import { AffiliatesListFiltersComponent } from './affiliates-list-filters.component';

@NgModule({
    declarations: [AffiliatesListFiltersComponent],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        FindCountryModule,
        DropdownPopupModule,
        FindManagersModule,
        OutputSelectedFiltersModule,
        FindPlatformStatusesModule,
        FindPlatformListModule
    ],
    exports: [AffiliatesListFiltersComponent]
})
export class AffiliatesListFiltersModule {}
