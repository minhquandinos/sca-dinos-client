import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportInfoComponent } from './report-info.component';

@NgModule({
    declarations: [ReportInfoComponent],
    exports: [ReportInfoComponent],
    imports: [CommonModule]
})
export class ReportInfoModule {}
