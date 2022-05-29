import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MediaWatcherDirectiveModule } from '@scaleo/core/media-watcher/directive';
import { SharedModule } from '@scaleo/core/shared/module';
import { OfferUpsertModule } from '@scaleo/feature/manager/offer/upsert/modal-form';
import { TargetingLinkBuilderModule } from '@scaleo/offer/targeting-link-builder/modal-form';
import { CustomPaginationModule, CustomSearchModule, HintCreateFirstItemModule, ModalExportModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ManagerOfferListFiltersModule } from './filters/manager-offer-list-filters.module';
import { ManagerOfferListModule } from './list/manager-offer-list.module';
import { ManagerOffersComponent } from './manager-offers.component';

@NgModule({
    declarations: [ManagerOffersComponent],
    imports: [
        CommonModule,
        CustomSearchModule,
        ModalExportModule,
        CustomPaginationModule,
        ManagerOfferListModule,
        ManagerOfferListFiltersModule,
        OfferUpsertModule,
        TargetingLinkBuilderModule,
        SharedModule,
        HintCreateFirstItemModule,
        UiButtonLinkModule,
        MediaWatcherDirectiveModule
    ],
    exports: [ManagerOffersComponent]
})
export class ManagerOffersModule {}
