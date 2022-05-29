import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { BooleanLabelModule } from '@scaleo/shared/components';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';

import { ReportAdjustmentDetailFormatFieldComponent } from './report-adjustment-detail-format-field.component';

@NgModule({
    declarations: [ReportAdjustmentDetailFormatFieldComponent],
    imports: [CommonModule, SharedModule, PlatformFormatPipeModule, BooleanLabelModule, TruncateTextPipeModule, PlatformStatusesModule],
    exports: [ReportAdjustmentDetailFormatFieldComponent]
})
export class ReportAdjustmentDetailFormatFieldModule {}
