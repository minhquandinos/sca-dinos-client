import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';

import { TableConversionHightchartModule } from './table-conversion-highcharts/table-conversion-hightchart.module';
import { ChangeColorOfNumberModule } from '../../../../directives/src/lib/change-color-of-number/change-color-of-number.module';
import { TableConversionComponent } from './table-conversion.component';

@NgModule({
    declarations: [TableConversionComponent],
    exports: [TableConversionComponent],
    imports: [CommonModule, PlatformFormatPipeModule, TableConversionHightchartModule, ChangeColorOfNumberModule]
})
export class TableConversionModule {}
