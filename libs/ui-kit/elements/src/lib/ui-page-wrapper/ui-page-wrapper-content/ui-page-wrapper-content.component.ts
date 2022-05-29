import { Component, ElementRef, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ui-page-wrapper-content',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./ui-page-wrapper-content.component.scss']
})
export class UiPageWrapperContentComponent {
    @HostBinding('class')
    hostClass = 'ui-page-wrapper-content page-wrapper-content';

    @Input()
    set className(className: string) {
        if (className) {
            this.hostClass += ` ${className}`;
        }
    }

    constructor(public readonly containerRef: ElementRef) {}
}
