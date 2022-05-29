import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ReportFieldHourComponent } from './report-field-hour.component';

@NgModule({
    declarations: [ReportFieldHourComponent],
    imports: [PlatformFormatPipeModule, CommonModule],
    exports: [ReportFieldHourComponent]
})
export class ReportFieldHourModule {}
