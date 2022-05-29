import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { StatisticRowMonthModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-connection-type',
    template: `
        <span class="text-capitalize" *ngIf="field?.year">
            {{ field?.month | reportFieldMonth: field?.year:translate.currentLang }}
        </span>
    `
})
export class ReportFieldMonthComponent extends BaseReportFieldComponent<StatisticRowMonthModel> {
    constructor(public translate: TranslateService) {
        super();
    }
}
