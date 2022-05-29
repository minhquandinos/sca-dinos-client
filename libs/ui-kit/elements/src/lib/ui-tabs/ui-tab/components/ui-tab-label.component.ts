import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ui-tab-label',
    template: ` <ng-template><ng-content></ng-content></ng-template> `
})
export class UiTabLabelComponent {
    @ViewChild(TemplateRef)
    labelContent: TemplateRef<any>;
}
