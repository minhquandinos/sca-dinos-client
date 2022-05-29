import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ReportLastUpdatedComponent } from './report-last-updated.component';

@NgModule({
    declarations: [ReportLastUpdatedComponent],
    imports: [CommonModule, SharedModule, UiButtonLinkModule],
    exports: [ReportLastUpdatedComponent]
})
export class ReportLastUpdatedModule {}
