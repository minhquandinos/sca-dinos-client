import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ReportFieldDeviceTypeIdEnum } from '../../../../../../../common/src/lib/enums/report-fields.enum';
import { StatisticRowDeviceModel } from '../../../../../../../common/src/lib/model/reports.model';

const iconMap = {
    [ReportFieldDeviceTypeIdEnum.Tablet]: 'ic_device_tablet',
    [ReportFieldDeviceTypeIdEnum.Desktop]: 'ic_device_desktop',
    [ReportFieldDeviceTypeIdEnum.Smartphone]: 'ic_device_phone',
    [ReportFieldDeviceTypeIdEnum.FeaturePhone]: 'ic_device_phone',
    [ReportFieldDeviceTypeIdEnum.Phablet]: 'ic_device_phone',
    [ReportFieldDeviceTypeIdEnum.Tv]: 'ic_device_tv',
    [ReportFieldDeviceTypeIdEnum.Console]: 'ic_device_game',
    [ReportFieldDeviceTypeIdEnum.CarBrowser]: 'ic_device_tv',
    [ReportFieldDeviceTypeIdEnum.SmartDisplay]: 'ic_device_tv',
    [ReportFieldDeviceTypeIdEnum.PortableMediaPlayer]: 'ic_device_tv'
};

@Component({
    selector: 'app-report-field-device-type-icon',
    template: `
        <div class="d-flex align-items-center" *ngIf="icon">
            <ui-svg-icon
                [icon]="icon"
                [tooltip]="'reports_page.fields.device_type.' + field?.value | translate"
                [display]="!!field?.value"
            ></ui-svg-icon>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportFieldDeviceTypeIconComponent {
    @Input() set data(field: StatisticRowDeviceModel) {
        if (field) {
            this.icon = iconMap[+field.type];
            this.field = {
                ...field,
                value: (field.value as string).replace(/ /g, '_')
            };
        }
    }

    field: StatisticRowDeviceModel;

    icon: string;

    tooltip: string;
}
