import { Component, OnInit } from '@angular/core';

import { FormatPipe } from '@scaleo/platform/format/pipe';
import { StatisticRowHourModel } from '@scaleo/reports/common';

import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-hour',
    template: `
        <ng-container *ngIf="hour">
            {{ hour }}
        </ng-container>
    `,
    providers: [FormatPipe]
})
export class ReportFieldHourComponent extends BaseReportFieldComponent<StatisticRowHourModel> implements OnInit {
    hour: string;

    constructor(private formatPipe: FormatPipe) {
        super();
    }

    ngOnInit(): void {
        if ((this.field?.date && this.field?.hour) || +this.field?.hour === 0) {
            this.hour = this.formatPipe.transform(`${this.field?.date} ${this.field?.hour}:00`, 'date', 'onlyDateWithTime');
        } else {
            this.hour = undefined;
        }
    }
}
