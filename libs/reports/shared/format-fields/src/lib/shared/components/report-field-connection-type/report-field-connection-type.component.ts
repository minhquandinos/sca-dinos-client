import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-connection-type',
    template: `{{ field.value }}`
    // template: `{{ item?.connection_type_name ? item?.connection_type_name : item?.connection_type }}`,
})
export class ReportFieldConnectionTypeComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
