import { Directive } from '@angular/core';

import { UiTable2ColSelectComponent } from '../components/ui-table2-col-select/ui-table2-col-select.component';

@Directive({
    selector: '[uiTable2ColSelect]'
})
export class UiTable2ColSelectDirective {
    constructor(public host: UiTable2ColSelectComponent) {}
}
