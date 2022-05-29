import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ReportFieldDeviceTypeIdEnum, ReportFieldDeviceTypeNameEnum } from '../../../../../../../common/src/lib/enums/report-fields.enum';
import { StatisticRowDeviceModel } from '../../../../../../../common/src/lib/model/reports.model';
import { BaseReportFieldComponent } from '../base-report-field.component';

@Component({
    selector: 'app-report-field-device-type',
    template: `
        <div class="d-flex align-items-center">
            <app-report-field-device-type-icon [data]="field"></app-report-field-device-type-icon>
            <span *ngIf="field?.value" class="pl-2">
                {{ 'reports_page.fields.device_type.' + field?.value | translate }}
            </span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldDeviceTypeComponent extends BaseReportFieldComponent<StatisticRowDeviceModel> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.transformField(this.field);
    }

    private transformField(field: StatisticRowDeviceModel) {
        if (field) {
            this.setField({
                ...field,
                type: field.type || field.id,
                value: (field.value as string).toLowerCase().replace(/ /g, '_')
            });
        } else {
            this.setField({
                type: ReportFieldDeviceTypeIdEnum.Desktop,
                value: ReportFieldDeviceTypeNameEnum.Desktop
            });
        }
    }
}
