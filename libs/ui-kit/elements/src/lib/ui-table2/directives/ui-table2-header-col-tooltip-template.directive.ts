import { Directive, Input, TemplateRef } from '@angular/core';

import { UiTable2ColumnTooltipType, UiTable2ColumnTooltipTypeEnum } from '..';

@Directive({
    selector: '[uiTable2HeaderColTooltipTemplate]'
})
export class UiTable2HeaderColTooltipTemplateDirective {
    @Input() uiTable2HeaderColTooltipTemplate: string;

    @Input() tooltipType: UiTable2ColumnTooltipType = UiTable2ColumnTooltipTypeEnum.Default;

    constructor(public readonly tpl: TemplateRef<any>) {}
}
