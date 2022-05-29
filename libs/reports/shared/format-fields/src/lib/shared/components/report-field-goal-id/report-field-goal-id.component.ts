import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-goal-id',
    template: `{{ +field.value !== 0 ? field : '' }}`
})
export class ReportFieldGoalIdComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
