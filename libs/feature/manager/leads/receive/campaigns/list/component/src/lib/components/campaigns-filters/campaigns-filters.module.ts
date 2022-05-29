import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindOfferModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';

import { CampaignsFiltersComponent } from './campaigns-filters.component';

@NgModule({
    declarations: [CampaignsFiltersComponent],
    exports: [CampaignsFiltersComponent],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        DropdownPopupModule,
        FindOfferModule,
        OutputSelectedFiltersModule,
        FindPlatformStatusesModule
    ]
})
export class CampaignsFiltersModule {}
