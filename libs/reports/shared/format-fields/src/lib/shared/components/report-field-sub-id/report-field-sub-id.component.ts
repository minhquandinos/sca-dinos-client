import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { StatisticRowRelationModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-sub-id',
    template: ` {{ field?.value }} `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldSubIdComponent extends BaseReportFieldComponent<StatisticRowRelationModel> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
        if (typeof this._item[this.fieldByKey] === 'string') {
            this.setField({
                id: null,
                parent_id: null,
                parent_value: null,
                value: this._item[this.fieldByKey] as string
            });
        }
    }
}
