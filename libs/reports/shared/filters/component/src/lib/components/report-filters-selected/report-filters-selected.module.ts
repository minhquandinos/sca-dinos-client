import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DropdownPopupModule, FiltersModule } from '@scaleo/shared/components';

import { ReportFilterTextModule } from './components/report-filter-text/report-filter-text.module';
import { DynamicFieldDirectiveDirective } from './dynamic-field-directive.directive';
import { ReportFilterCountSelectedPipe } from './pipes/report-filter-count-selected.pipe';
import { ReportFiltersSelectedComponent } from './report-filters-selected.component';
import { ReportFiltersSelectedCompositeFilterModule } from './report-filters-selected-composite-filter/report-filters-selected-composite-filter.module';
import { ReportFiltersSelectedDefaultSelectModule } from './report-filters-selected-default-select/report-filters-selected-default-select.module';

@NgModule({
    declarations: [ReportFiltersSelectedComponent, DynamicFieldDirectiveDirective, ReportFilterCountSelectedPipe],
    imports: [
        CommonModule,
        FiltersModule,
        SharedModule,
        DropdownPopupModule,
        ReportFiltersSelectedDefaultSelectModule,
        ReportFiltersSelectedCompositeFilterModule,
        ReportFilterTextModule
    ],
    exports: [ReportFiltersSelectedComponent]
})
export class ReportFiltersSelectedModule {}
