import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DashboardSummaryModule } from '@scaleo/dashboard-old/shared/widgets/summary/component';

import { OfferProfileFinancesComponent } from './offer-profile-finances.component';

@NgModule({
    declarations: [OfferProfileFinancesComponent],
    imports: [CommonModule, SharedModule, DashboardSummaryModule],
    exports: [OfferProfileFinancesComponent]
})
export class OfferProfileFinancesModule {}
