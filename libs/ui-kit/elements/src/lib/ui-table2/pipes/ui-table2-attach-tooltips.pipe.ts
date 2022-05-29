import { Pipe, PipeTransform } from '@angular/core';

import { UiTable2ColumnsModel, UiTable2ColumnTooltipModel } from '../models/ui-table2-columns.model';

@Pipe({
    name: 'uiTable2AttachTooltips'
})
export class UiTable2AttachTooltipsPipe implements PipeTransform {
    transform(columns: UiTable2ColumnsModel[], tooltips: UiTable2ColumnTooltipModel[]): UiTable2ColumnsModel[] {
        if (tooltips) {
            return columns.map((column) => {
                const tooltip = tooltips.find((elem) => elem.tooltipKey === column.value);
                if (tooltip && column?.value === tooltip?.tooltipKey) {
                    return {
                        ...column,
                        tooltip: tooltip?.tooltip,
                        tooltipTpl: tooltip?.tooltipTpl || undefined,
                        tooltipTranslate: tooltip?.tooltipTranslate || undefined
                    };
                }
                return column;
            });
        }

        return columns;
    }
}
