import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomDateRangeModule } from '@scaleo/shared/components';

import { ReportDateRangeComponent } from './report-date-range.component';

@NgModule({
    declarations: [ReportDateRangeComponent],
    imports: [CommonModule, CustomDateRangeModule],
    exports: [ReportDateRangeComponent]
})
export class ReportDateRangeModule {}
