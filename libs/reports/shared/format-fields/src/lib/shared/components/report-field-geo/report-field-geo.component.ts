import { Component } from '@angular/core';

import { StatisticRowGeoModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-geo',
    template: `
        <span class="d-flex align-items-center">
            <app-country-flag [countryCode]="field?.country_code" className="mr-2"></app-country-flag>
            {{ field | transformGeo }}
        </span>
    `
})
export class ReportFieldGeoComponent extends BaseReportFieldComponent<StatisticRowGeoModel> {
    constructor() {
        super();
    }
}
