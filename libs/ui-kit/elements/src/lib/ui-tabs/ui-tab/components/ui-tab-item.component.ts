import { Component, Input } from '@angular/core';

import { BaseTabItemComponent } from './base-tab-item.component';

@Component({
    selector: 'ui-tab-item',
    template: ` <ng-content></ng-content>`
})
export class UiTabItemComponent extends BaseTabItemComponent {
    @Input()
    name: string;
}
