import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { ReportFiltersLabelSelectPipe } from './pipes/report-filters-label-select.pipe';
import { ReportFiltersSelectedDefaultSelectComponent } from './report-filters-selected-default-select.component';

@NgModule({
    declarations: [ReportFiltersSelectedDefaultSelectComponent, ReportFiltersLabelSelectPipe],
    imports: [CommonModule, SharedModule, UiChipModule, SelectModule],
    exports: [ReportFiltersSelectedDefaultSelectComponent]
})
export class ReportFiltersSelectedDefaultSelectModule {}
