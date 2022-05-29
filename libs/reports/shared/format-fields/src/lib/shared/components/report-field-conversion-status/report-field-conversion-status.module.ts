import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';

import { ReportFieldConversionStatusComponent } from './report-field-conversion-status.component';

@NgModule({
    declarations: [ReportFieldConversionStatusComponent],
    imports: [SharedModule, PlatformStatusesModule],
    exports: [ReportFieldConversionStatusComponent]
})
export class ReportFieldConversionStatusModule {}
