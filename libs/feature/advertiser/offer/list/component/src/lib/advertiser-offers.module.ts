import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomPaginationModule, CustomSearchModule, FiltersModule } from '@scaleo/shared/components';

import { AdvertiserOffersComponent } from './advertiser-offers.component';
import { AdvertiserOfferListFiltersModule } from './filters/advertiser-offer-list-filters.module';
import { AdvertiserOfferListModule } from './list/advertiser-offer-list.module';

@NgModule({
    declarations: [AdvertiserOffersComponent],
    imports: [
        CommonModule,
        AdvertiserOfferListFiltersModule,
        AdvertiserOfferListModule,
        FiltersModule,
        CustomSearchModule,
        CustomPaginationModule,
        SharedModule
    ],
    exports: [AdvertiserOffersComponent]
})
export class AdvertiserOffersModule {}
