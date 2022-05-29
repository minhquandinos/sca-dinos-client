import { Component } from '@angular/core';

import { StatisticRowCountryModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-device-brand',
    template: `{{ field.value }}`
    // template: `{{ item?.brand_name ? item?.brand_name : item?.device_brand }}`
})
export class ReportFieldDeviceBrandComponent extends BaseReportFieldComponent<StatisticRowCountryModel> {
    constructor() {
        super();
    }
}
