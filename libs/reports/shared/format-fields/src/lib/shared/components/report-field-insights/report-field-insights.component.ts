import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { StatisticRowInsightsModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-insights',
    templateUrl: './report-field-insights.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldInsightsComponent extends BaseReportFieldComponent<StatisticRowInsightsModel> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
