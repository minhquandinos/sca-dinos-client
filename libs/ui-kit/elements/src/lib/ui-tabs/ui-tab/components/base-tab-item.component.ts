import { Component, ContentChild, Input } from '@angular/core';

import { UiTabBodyDirective } from '../directives/ui-tab-body.directive';
import { UiTabBodyComponent } from './ui-tab-body.component';
import { UiTabLabelComponent } from './ui-tab-label.component';

@Component({
    template: ``
})
export abstract class BaseTabItemComponent {
    @Input() label: string;

    @Input() isActive: boolean;

    @ContentChild(UiTabBodyComponent)
    tabBodyComponent: UiTabBodyComponent;

    @ContentChild(UiTabBodyDirective)
    tabBodyDirective: UiTabBodyDirective;

    @ContentChild(UiTabLabelComponent)
    tabLabelComponent: UiTabLabelComponent;
}
