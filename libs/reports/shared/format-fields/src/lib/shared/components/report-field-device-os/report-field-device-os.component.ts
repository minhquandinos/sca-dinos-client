import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-device-os',
    template: `
        {{ field.value }}
    `
    // template: `{{ item?.os_name ? item?.os_name : item?.device_os }}`
})
export class ReportFieldDeviceOsComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
