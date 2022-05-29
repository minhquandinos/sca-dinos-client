import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[uiTable2ColTemplate]'
})
export class UiTable2ColTemplateDirective {
    @Input() uiTable2ColTemplate: string;

    @Input() className: string = undefined;

    @Input() innerClassName: string = undefined;

    constructor(public readonly tpl: TemplateRef<any>) {}
}
