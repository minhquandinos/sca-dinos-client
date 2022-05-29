import { Directive, Input, Optional, TemplateRef } from '@angular/core';

import { UiSimpleTableColType, UiSimpleTableColWidth } from '../types/ui-simple-table-col.type';

@Directive({
    selector: '[uiSimpleTableColTpl]'
})
export class UiSimpleTableColTplDirective {
    @Input() align: UiSimpleTableColType;

    @Input() width: UiSimpleTableColWidth;

    @Input('uiSimpleTableColTpl') key: string;

    constructor(@Optional() public readonly hostTpl: TemplateRef<any>) {}
}
