import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ReportFieldGoalIdComponent } from './report-field-goal-id.component';

@NgModule({
    declarations: [ReportFieldGoalIdComponent],
    exports: [ReportFieldGoalIdComponent]
})
export class ReportFieldGoalIdModule {}
