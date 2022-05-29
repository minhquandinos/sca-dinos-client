import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-status',
    template: `
        <span *ngIf="field?.value" [appStatus2Color]="field.value" type="conversion_statuses">
            {{ field.value | statusLabel: 'conversion_statuses' | async }}
        </span>
    `
})
export class ReportFieldConversionStatusComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
