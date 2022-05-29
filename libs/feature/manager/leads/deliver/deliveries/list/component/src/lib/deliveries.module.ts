import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomPaginationModule, DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindCampaignsModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { TableNavigationModule, UiButtonLinkModule, UiStatusColorModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { DeliveriesFiltersComponent } from './components/deliveries-filters/deliveries-filters.component';
import { DeliveriesComponent } from './deliveries.component';

@NgModule({
    declarations: [DeliveriesComponent, DeliveriesFiltersComponent],
    imports: [
        CommonModule,
        RouterModule,
        TableNavigationModule,
        CustomPaginationModule,
        UiTable2Module,
        UiStatusColorModule,
        PlatformFormatPipeModule,
        FiltersModule,
        SharedModule,
        DropdownPopupModule,
        FindCampaignsModule,
        OutputSelectedFiltersModule,
        UiButtonLinkModule,
        FindPlatformStatusesModule
    ]
})
export class DeliveriesModule {}
