import { NgModule } from '@angular/core';

import { UiImageModule } from '@scaleo/ui-kit/elements';

import { CountryFlagModule } from '../../../../../../../../shared/components/src/lib/country-flag/country-flag.module';
import { ReportTransformGeoModule } from '../../pipes/report-transform-geo/report-transform-geo.module';
import { ReportFieldGeoComponent } from './report-field-geo.component';

@NgModule({
    declarations: [ReportFieldGeoComponent],
    imports: [UiImageModule, CountryFlagModule, ReportTransformGeoModule],
    exports: [ReportFieldGeoComponent]
})
export class ReportFieldGeoModule {}
