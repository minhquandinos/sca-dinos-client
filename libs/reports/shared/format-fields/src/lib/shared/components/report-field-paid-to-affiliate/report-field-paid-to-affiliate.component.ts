import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-paid-to-affiliate',
    template: ` <span *ngIf="field?.value" [appStatus2Color]="field?.value" type="invoices_statuses">
        {{ field?.value | statusLabel: 'invoices_statuses' | async }}
    </span>`
})
export class ReportFieldPaidToAffiliateComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {
    constructor() {
        super();
    }
}
