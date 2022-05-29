import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiSvgIconModule } from '../../../../../../../../ui-kit/elements/src/lib/ui-svg-icon/ui-svg-icon.module';
import { ReportFieldDeviceTypeComponent } from './report-field-device-type.component';
import { ReportFieldDeviceTypeIconComponent } from './report-field-device-type-icon.component';

@NgModule({
    declarations: [ReportFieldDeviceTypeComponent, ReportFieldDeviceTypeIconComponent],
    imports: [UiSvgIconModule, SharedModule],
    exports: [ReportFieldDeviceTypeComponent, ReportFieldDeviceTypeIconComponent]
})
export class ReportFieldDeviceTypeModule {}
