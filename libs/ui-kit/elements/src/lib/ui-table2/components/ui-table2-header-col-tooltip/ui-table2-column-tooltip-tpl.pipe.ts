import { Pipe, PipeTransform } from '@angular/core';

import { UiTable2ColumnsModel } from '../..';

@Pipe({
    name: 'uiTable2ColumnTooltipTpl'
})
export class UiTable2ColumnTooltipTplPipe implements PipeTransform {
    transform(column: UiTable2ColumnsModel): boolean {
        return !!column?.tooltipTpl;
    }
}
