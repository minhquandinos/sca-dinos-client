import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ReportFieldDayComponent } from './report-field-day.component';

@NgModule({
    declarations: [ReportFieldDayComponent],
    imports: [PlatformFormatPipeModule],
    exports: [ReportFieldDayComponent]
})
export class ReportFieldDayModule {}
