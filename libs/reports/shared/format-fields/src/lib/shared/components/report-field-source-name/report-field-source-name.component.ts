import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-source-name',
    template: ` {{ field?.value }} `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldSourceNameComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
