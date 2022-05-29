import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    FindBrowserModule,
    FindDeviceBrandsModule,
    FindDeviceModelsModule,
    FindGeoNamesModule,
    FindInvoicesModule,
    FindLanguagesModule,
    FindMobileOperatorsModule,
    FindOperatingSystemsModule
} from '@scaleo/shared/components/find';

import { ReportFiltersDropdownModule } from './components/report-filters-dropdown/report-filters-dropdown.module';
import { ReportFilterTextModule } from './components/report-filters-selected/components/report-filter-text/report-filter-text.module';
import { ReportFiltersSelectedModule } from './components/report-filters-selected/report-filters-selected.module';
import { ReportOutputFiltersSelectedModule } from './components/report-output-filters-selected/report-output-filters-selected.module';
import { ReportFiltersComponent } from './report-filters.component';

@NgModule({
    declarations: [ReportFiltersComponent],
    imports: [
        CommonModule,
        ReportFiltersDropdownModule,
        ReportFiltersSelectedModule,
        ReportOutputFiltersSelectedModule,
        FindMobileOperatorsModule,
        FindBrowserModule,
        FindOperatingSystemsModule,
        FindLanguagesModule,
        FindGeoNamesModule,
        FindDeviceModelsModule,
        FindDeviceBrandsModule,
        FindInvoicesModule,
        ReportFilterTextModule
    ],
    exports: [ReportFiltersComponent]
})
export class ReportFiltersModule {}
