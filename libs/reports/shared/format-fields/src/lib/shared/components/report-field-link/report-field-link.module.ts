import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { HyperlinkModule } from '@scaleo/shared/components';

import { ReportFieldLinkComponent } from './report-field-link.component';

@NgModule({
    declarations: [ReportFieldLinkComponent],
    imports: [CommonModule, PlatformFormatPipeModule, HyperlinkModule]
})
export class ReportFieldLinkModule {}
