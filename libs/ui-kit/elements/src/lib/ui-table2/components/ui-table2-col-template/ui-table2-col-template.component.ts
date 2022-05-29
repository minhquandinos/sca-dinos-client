import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'ui-table2-col-template',
    template: `<ng-content></ng-content>`
})
export class UiTable2ColTemplateComponent {
    @Input() key: string;

    @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}
