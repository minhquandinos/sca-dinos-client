import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-mobile-operator',
    template: `{{ field.value }}`
    // template: `{{ item?.mobile_operator_name ? item?.mobile_operator_name : item?.mobile_operator }}`,
})
export class ReportFieldMobileOperatorComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
