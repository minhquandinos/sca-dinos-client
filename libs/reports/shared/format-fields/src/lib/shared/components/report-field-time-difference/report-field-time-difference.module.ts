import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ReportFieldTimeDifferenceComponent } from './report-field-time-difference.component';

@NgModule({
    declarations: [ReportFieldTimeDifferenceComponent],
    imports: [CommonModule, PlatformFormatPipeModule, TranslateModule],
    exports: [ReportFieldTimeDifferenceComponent]
})
export class ReportFieldTimeDifferenceModule {}
