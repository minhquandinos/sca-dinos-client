import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { StatisticRowCountryModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-country',
    template: `
        <span class="d-flex align-items-center">
            <app-country-flag [countryCode]="field?.code" className="mr-2"></app-country-flag>
            {{ field?.value }}
        </span>
    `
})
export class ReportFieldCountryComponent extends BaseReportFieldComponent<StatisticRowCountryModel> implements OnInit {
    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        if ((!this.field?.id || !this.field?.code) && !this.isBreakdown) {
            this.setField({
                id: null,
                code: null,
                value: this.field?.value as string
            });
            this.cdr.markForCheck();
        }
    }
}
