import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiDropdownEntityModule } from '@scaleo/ui-kit/components/dropdown-entity';
import { EntityListModule, UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ReportFilterSearchPipe } from '../../pipes/report-filter-search.pipe';
import { ReportFiltersDropdownComponent } from './report-filters-dropdown.component';
import { ReportFiltersSaveddPipe } from './report-filters-saved.pipe';

@NgModule({
    declarations: [ReportFiltersDropdownComponent, ReportFilterSearchPipe, ReportFiltersSaveddPipe],
    exports: [ReportFiltersDropdownComponent, ReportFilterSearchPipe],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, UiDropdownEntityModule, EntityListModule, UiSvgIconModule]
})
export class ReportFiltersDropdownModule {}
