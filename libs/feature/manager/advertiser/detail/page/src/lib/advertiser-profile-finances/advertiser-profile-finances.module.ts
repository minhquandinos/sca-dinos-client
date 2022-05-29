import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { DashboardSummaryModule } from '../../../../../../../../dashboard-old/shared/widgets/summary/component/src/lib/dashboard-summary.module';
import { AdvertiserProfileFinancesComponent } from './advertiser-profile-finances.component';

@NgModule({
    declarations: [AdvertiserProfileFinancesComponent],
    imports: [CommonModule, SharedModule, DashboardSummaryModule],
    exports: [AdvertiserProfileFinancesComponent]
})
export class AdvertiserProfileFinancesModule {}
