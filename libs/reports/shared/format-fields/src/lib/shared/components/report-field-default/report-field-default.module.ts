import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { StringLengthModule } from '@scaleo/shared/directives';

import { ColorFieldByKeyValueDirectiveModule } from '../../directives/color-field-by-key-value/color-field-by-key-value.directive.module';
import { AmpPipeModule } from '../../pipes/amp/amp.pipe.module';
import { ReportFieldDefaultComponent } from './report-field-default.component';

@NgModule({
    declarations: [ReportFieldDefaultComponent],
    imports: [PlatformFormatPipeModule, AmpPipeModule, StringLengthModule, ColorFieldByKeyValueDirectiveModule, CommonModule],
    exports: [ReportFieldDefaultComponent]
})
export class ReportFieldDefaultModule {}
