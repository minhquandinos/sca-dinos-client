import { Component } from '@angular/core';

import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-delivery-status',
    template: `<span [appStatus2Color]="field?.value" type="delivery_status">{{
        field?.value | statusLabel: 'delivery_status' | async
    }}</span>`
})
export class ReportFieldDeliveryStatusComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> {}
