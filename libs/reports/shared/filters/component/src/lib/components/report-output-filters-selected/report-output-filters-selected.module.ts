import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { OutputSelectedFiltersModule } from '@scaleo/shared/components';

import { ReportOutputFilterSelectedComponent } from './report-output-filter-selected.component';
import { ReportOutputFiltersSelectedComponent } from './report-output-filters-selected.component';

@NgModule({
    declarations: [ReportOutputFiltersSelectedComponent, ReportOutputFilterSelectedComponent],
    imports: [CommonModule, OutputSelectedFiltersModule, SharedModule, PlatformFormatPipeModule],
    exports: [ReportOutputFiltersSelectedComponent]
})
export class ReportOutputFiltersSelectedModule {}
