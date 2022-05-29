import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-tab-nav-link]',
    template: `
        <div class="ui-tabs__item h-100">
            <ng-content></ng-content>
            <ng-container #htmlElement></ng-container>
        </div>
    `
})
export class UiTabNavLinkComponent {
    @ViewChild('htmlElement', { read: ViewContainerRef }) htmlElement: ViewContainerRef;
}
