import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appMultiSelectItemTemplate]'
})
export class MultiSelectItemTemplateDirective {
    constructor(public readonly template: TemplateRef<any>) {}
}
