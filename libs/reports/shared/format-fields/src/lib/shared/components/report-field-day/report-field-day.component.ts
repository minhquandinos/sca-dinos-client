import { Component } from '@angular/core';

import { StatisticRowCountryModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-day',
    template: `{{ field.value | format: 'date' }}`
})
export class ReportFieldDayComponent extends BaseReportFieldComponent<StatisticRowCountryModel> {
    constructor() {
        super();
    }
}
