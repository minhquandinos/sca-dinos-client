import { Component, OnInit } from '@angular/core';

import { StatisticDefaultRowModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-time-difference',
    template: `
        <ng-container *ngIf="countDay !== 0">
            {{ countDay + ('reports_page.d' | translate) }}
        </ng-container>
        {{ +field?.value * 1000 | date: 'HH:mm:ss':'UTC' }}
    `
})
export class ReportFieldTimeDifferenceComponent extends BaseReportFieldComponent<StatisticDefaultRowModel> implements OnInit {
    constructor() {
        super();
    }

    countDay = 0;

    ngOnInit(): void {
        if (this.field?.value) {
            const secInHour = 86400;
            this.countDay = +String(+this.field?.value / secInHour).split('.')[0];
        }
    }
}
