import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { SharedModule } from '@scaleo/core/shared/module';
import { CustomPaginationModule, CustomSearchModule, ModalExportModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateOffersComponent } from './affiliate-offers.component';
import { AffiliateOffersListFiltersModule } from './filters/affiliate-offers-list-filters.module';
import { AffiliateOffersListModule } from './list/affiliate-offers-list.module';

@NgModule({
    declarations: [AffiliateOffersComponent],
    imports: [
        CommonModule,
        AffiliateOffersListFiltersModule,
        CustomSearchModule,
        CustomPaginationModule,
        SharedModule,
        UiButtonLinkModule,
        MediaWatcherDirectiveModule,
        AffiliateOffersListModule
    ]
})
export class AffiliateOffersModule {}
