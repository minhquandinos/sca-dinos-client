import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import {
    FindAdvertisersModule,
    FindCountryModule,
    FindPlatformListModule,
    FindPlatformStatusesModule
} from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { AdvertiserOfferListFiltersComponent } from './advertiser-offer-list-filters.component';

@NgModule({
    declarations: [AdvertiserOfferListFiltersComponent],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        OutputSelectedFiltersModule,
        UiChipModule,
        FindCountryModule,
        DropdownPopupModule,
        FindAdvertisersModule,
        SelectModule,
        FindPlatformListModule,
        FindPlatformStatusesModule
    ],
    exports: [AdvertiserOfferListFiltersComponent]
})
export class AdvertiserOfferListFiltersModule {}
