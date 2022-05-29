import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportFormatFieldsComponent } from './report-format-fields.component';
import { RightAlignForNumberModule } from './shared/directives/right-align-for-number';
import { ReportFormatFieldsSharedModule } from './shared/report-format-fields-shared.module';

@NgModule({
    declarations: [ReportFormatFieldsComponent],
    imports: [ReportFormatFieldsSharedModule, RightAlignForNumberModule, CommonModule],
    exports: [ReportFormatFieldsComponent]
})
export class ReportFormatFieldsModule {}
