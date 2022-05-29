import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[uiTable2HeaderColTemplate]'
})
export class UiTable2HeaderColTemplateDirective {
    @Input() appUiTable2ColTemplate: string;

    constructor(public readonly tpl: TemplateRef<any>) {}
}
