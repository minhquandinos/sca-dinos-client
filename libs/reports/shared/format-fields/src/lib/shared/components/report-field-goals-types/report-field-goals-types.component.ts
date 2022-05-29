import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-goals-types',
    template: ` {{ field.value }} `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldGoalsTypesComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
