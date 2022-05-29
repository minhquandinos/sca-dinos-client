import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportFieldMonthComponent } from './report-field-month.component';
import { ReportFieldMonthPipe } from './report-field-month.pipe';

@NgModule({
    declarations: [ReportFieldMonthComponent, ReportFieldMonthPipe],
    imports: [CommonModule],
    exports: [ReportFieldMonthComponent]
})
export class ReportFieldMonthModule {}
