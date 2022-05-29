import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomSearchModule, DropdownPopupModule, FiltersModule, OutputSelectedFiltersModule } from '@scaleo/shared/components';
import { FindPaymentMethodsModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';

import { BillingAffiliatesFiltersComponent } from './billing-affiliates-filters.component';

@NgModule({
    declarations: [BillingAffiliatesFiltersComponent],
    exports: [BillingAffiliatesFiltersComponent],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        DropdownPopupModule,
        FindPlatformListModule,
        CustomSearchModule,
        OutputSelectedFiltersModule,
        FindPaymentMethodsModule,
        FindPlatformStatusesModule
    ]
})
export class BillingAffiliatesFiltersModule {}
