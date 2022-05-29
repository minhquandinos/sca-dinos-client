import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[scaleoTableNavigationDropdown]'
})
export class TableNavigationDropdownDirective {
    constructor(readonly template: TemplateRef<any>) {}
}
