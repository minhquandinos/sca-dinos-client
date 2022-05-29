import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferGoalsColumnsModule } from '@scaleo/feature/manager/offer/goal/shared/components/offer-goal-columns';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { BooleanLabelModule, CustomPaginationModule, CustomSearchModule, FiltersModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { GoalTypePipeModule } from '@scaleo/shared/pipes';
import {
    CardModule,
    TableNavigationModule,
    UiButtonLinkModule,
    UiChipModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { OfferGoalsListComponent } from './components/offer-goals-list/offer-goals-list.component';
import { OfferGoalsCollectionComponent } from './offer-goals-collection.component';

@NgModule({
    declarations: [OfferGoalsListComponent, OfferGoalsCollectionComponent],
    imports: [
        CommonModule,
        CardModule,
        UiButtonLinkModule,
        SharedModule,
        FiltersModule,
        CustomSearchModule,
        FindPlatformStatusesModule,
        CustomPaginationModule,
        UiTable2Module,
        PlatformFormatPipeModule,
        UiChipModule,
        UiSvgIconModule,
        TableNavigationModule,
        PlatformListTranslateModule,
        GoalTypePipeModule,
        PlatformStatusesModule,
        BooleanLabelModule,
        OfferGoalsColumnsModule
    ]
})
export class OfferGoalsCollectionModule {}
