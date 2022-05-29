import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { ColorFieldByKeyValueDirectiveModule } from '../../directives/color-field-by-key-value/color-field-by-key-value.directive.module';
import { ReportFieldClicksComponent } from './components/report-field-clicks.component';
import { ReportFieldCvApprovedComponent } from './components/report-field-cv-approved.component';
import { ReportFieldCvPendingComponent } from './components/report-field-cv-pending.component';
import { ReportFieldCvRejectedComponent } from './components/report-field-cv-rejected.component';
import { ReportFieldCvTotalComponent } from './components/report-field-cv-total.component';
import { ReportFieldCvTrashComponent } from './components/report-field-cv-trash.component';
import { ReportFieldInvalidClicksComponent } from './components/report-field-invalid-clicks.component';
import { PrepareRecipientFilterService } from './prepare-recipient-filter.service';

@NgModule({
    declarations: [
        ReportFieldClicksComponent,
        ReportFieldInvalidClicksComponent,
        ReportFieldCvApprovedComponent,
        ReportFieldCvTotalComponent,
        ReportFieldCvPendingComponent,
        ReportFieldCvRejectedComponent,
        ReportFieldCvTrashComponent
    ],
    imports: [CommonModule, ColorFieldByKeyValueDirectiveModule, PlatformFormatPipeModule, SharedModule],
    providers: [PrepareRecipientFilterService]
})
export class ReportFieldLinkReportModule {}
