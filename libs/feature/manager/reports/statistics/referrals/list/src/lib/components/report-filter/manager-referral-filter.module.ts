import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindAdvertisersModule, FindAffiliatesModule } from '@scaleo/shared/components/find';
import { DropdownMenuModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ManagerReferralFilterComponent } from './manager-referral-filter.component';

@NgModule({
    declarations: [ManagerReferralFilterComponent],
    exports: [ManagerReferralFilterComponent],
    imports: [
        CommonModule,
        SharedModule,
        FiltersModule,
        DropdownMenuModule,
        UiButtonLinkModule,
        FindAdvertisersModule,
        FindAffiliatesModule,
        DropdownPopupModule,
        OutputSelectedFiltersModule
    ]
})
export class ManagerReferralFilterModule {}
