import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindCountryModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { AffiliateOffersListFiltersComponent } from './affiliate-offers-list-filters.component';

@NgModule({
    declarations: [AffiliateOffersListFiltersComponent],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        OutputSelectedFiltersModule,
        UiChipModule,
        FindCountryModule,
        DropdownPopupModule,
        SelectModule,
        FindPlatformListModule,
        FindPlatformStatusesModule
    ],
    exports: [AffiliateOffersListFiltersComponent]
})
export class AffiliateOffersListFiltersModule {}
