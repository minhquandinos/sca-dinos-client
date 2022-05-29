import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CountryFlagModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ReportTransformGeoModule } from '../../pipes/report-transform-geo/report-transform-geo.module';
import { ReportFieldDeviceTypeModule } from '../report-field-device-type/report-field-device-type.module';
import { ReportFieldInsightsCountryComponent } from './components/report-field-insights-country/report-field-insights-country.component';
import { ReportFieldInsightsOsComponent } from './components/report-field-insights-os/report-field-insights-os.component';
import { ReportFieldInsightsComponent } from './report-field-insights.component';

@NgModule({
    declarations: [ReportFieldInsightsComponent, ReportFieldInsightsOsComponent, ReportFieldInsightsCountryComponent],
    exports: [ReportFieldInsightsCountryComponent],
    imports: [CommonModule, CountryFlagModule, SharedModule, UiSvgIconModule, ReportTransformGeoModule, ReportFieldDeviceTypeModule]
})
export class ReportFieldInsightsModule {}
