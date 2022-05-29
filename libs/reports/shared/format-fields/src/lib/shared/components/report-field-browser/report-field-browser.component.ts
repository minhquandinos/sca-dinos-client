import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-browser',
    template: `{{ field?.value }}`
    // template: `{{ item?.browser_name ? item?.browser_name : item?.browser }}`,
})
export class ReportFieldBrowserComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
