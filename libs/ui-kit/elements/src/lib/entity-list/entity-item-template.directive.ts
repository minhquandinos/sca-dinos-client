import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appEntityItemTemplate]'
})
export class EntityItemTemplateDirective {
    constructor(public tpl: TemplateRef<any>) {}
}
