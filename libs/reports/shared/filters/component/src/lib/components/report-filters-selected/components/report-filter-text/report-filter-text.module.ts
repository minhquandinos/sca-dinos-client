import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { TextareaModule } from '@scaleo/shared/components';

import { ReportFilterTextComponent } from './report-filter-text.component';
import { ReportFilterTextareaDirective } from './report-filter-textarea.directive';

@NgModule({
    declarations: [ReportFilterTextComponent, ReportFilterTextareaDirective],
    imports: [CommonModule, TextareaModule, SharedModule],
    exports: [ReportFilterTextComponent]
})
export class ReportFilterTextModule {}
