import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, QueryList, Renderer2 } from '@angular/core';

import { UiSimpleTableColComponent } from '../ui-simple-table-col/ui-simple-table-col.component';

@Component({
    selector: 'ui-simple-table-row, [uiSimpleTableRow]',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSimpleTableRowComponent {
    @Input() set hoverDisabled(value: boolean) {
        if (value) {
            this.renderer.addClass(this.host.nativeElement, `${this.hostClass}__hover-disabled`);
        }
    }

    @HostBinding('class') hostClass = 'ui-simple-table-row';

    @ContentChildren(UiSimpleTableColComponent)
    childComponents: QueryList<UiSimpleTableColComponent>;

    constructor(private renderer: Renderer2, private host: ElementRef) {}
}
