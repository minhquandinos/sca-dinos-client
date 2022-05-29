import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { newStatisticsBreakdowns, STATISTICS_BREAKDOWNS_TOKEN } from '@scaleo/reports/statistic/common';

import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
    imports: [CommonModule, ReportsRoutingModule],
    providers: [
        {
            provide: STATISTICS_BREAKDOWNS_TOKEN,
            useValue: newStatisticsBreakdowns
        }
    ]
})
export class ReportsModule {}
