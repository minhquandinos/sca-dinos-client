import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { ReportFiltersSelectedCompositeFilterComponent } from './report-filters-selected-composite-filter.component';

@NgModule({
    declarations: [ReportFiltersSelectedCompositeFilterComponent],
    imports: [CommonModule, UiChipModule, SharedModule, SelectModule, PlatformFormatPipeModule],
    exports: [ReportFiltersSelectedCompositeFilterComponent]
})
export class ReportFiltersSelectedCompositeFilterModule {}
