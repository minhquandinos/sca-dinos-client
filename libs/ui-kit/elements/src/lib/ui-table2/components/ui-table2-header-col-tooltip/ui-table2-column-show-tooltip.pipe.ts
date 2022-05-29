import { Pipe, PipeTransform } from '@angular/core';

import { UiTable2ColumnsModel, UiTable2ColumnTooltipType, UiTable2ColumnTooltipTypeEnum } from '../..';

@Pipe({
    name: 'uiTable2ColumnShowTooltip'
})
export class UiTable2ColumnShowTooltipPipe implements PipeTransform {
    transform(column: UiTable2ColumnsModel, checkType: UiTable2ColumnTooltipType): boolean {
        return (
            !!column?.tooltip && this.isTooltipType(checkType, column?.tooltipType)

            // TODO fixed, bug ng2-tooltip-directive return object object in tooltip when uncomented
            // TODO perhaps bug in param display
            // this.hasTooltipBody(column.tooltipTpl, column.tooltipTranslate)
        );
    }

    private isTooltipType(checkType: UiTable2ColumnTooltipType, columnType: UiTable2ColumnTooltipType): boolean {
        if (!columnType && checkType === UiTable2ColumnTooltipTypeEnum.Default) {
            return true;
        }

        switch (columnType) {
            case UiTable2ColumnTooltipTypeEnum.Info:
                return checkType === UiTable2ColumnTooltipTypeEnum.Info;
            case UiTable2ColumnTooltipTypeEnum.Default:
                return checkType === UiTable2ColumnTooltipTypeEnum.Default;
            default:
                return false;
        }
    }

    // private hasTooltipBody(tpl: TemplateRef<any>, text: string): boolean {
    //     return !!(tpl || text);
    // }
}
