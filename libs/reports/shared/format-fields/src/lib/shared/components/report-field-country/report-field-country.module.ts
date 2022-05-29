import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountryFlagModule } from '../../../../../../../../shared/components/src/lib/country-flag/country-flag.module';
import { ReportFieldCountryComponent } from './report-field-country.component';

@NgModule({
    declarations: [ReportFieldCountryComponent],
    imports: [CountryFlagModule, CommonModule],
    exports: [ReportFieldCountryComponent]
})
export class ReportFieldCountryModule {}
