import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[uiTabBodyTpl]'
})
export class UiTabBodyDirective {
    constructor(public readonly template: TemplateRef<any>) {}
}
