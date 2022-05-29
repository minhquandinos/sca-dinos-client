import { Component } from '@angular/core';

import { StatisticRowCountryModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-device-model',
    template: `{{ field?.value }}`
    // template: `{{ item?.model_name ? item?.model_name : item?.device_model }}`
})
export class ReportFieldDeviceModelComponent extends BaseReportFieldComponent<StatisticRowCountryModel> {
    constructor() {
        super();
    }
}
