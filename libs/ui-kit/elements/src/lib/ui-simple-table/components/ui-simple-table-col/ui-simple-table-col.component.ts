import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

import { UiSimpleTableColWidth } from '../../types/ui-simple-table-col.type';

@Component({
    selector: 'ui-simple-table-col, [uiSimpleTableCol]',
    template: `
        <div class="ui-simple-table-col__wrapper" [ngClass]="contentPosition">
            <div class="d-flex align-items-center h-100" #innerContainer>
                <ng-content></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiSimpleTableColComponent {
    @HostBinding('class') hostClass = 'ui-simple-table-col';

    @Input() set align(value: 'right' | 'center') {
        const position = {
            right: 'justify-content-end',
            center: 'justify-content-center'
        };

        if (position[value]) {
            this.contentPosition = position[value];
        }
    }

    @Input() set colHeight(value: string) {
        if (value) {
            this.renderer.setStyle(this.host.nativeElement, 'height', value);
        }
    }

    @Input() set colWidth(value: UiSimpleTableColWidth) {
        if (value) {
            this.renderer.setStyle(this.innerWidthContainer.nativeElement, 'width', value);
        }
    }

    contentPosition: string;

    @ViewChild('innerContainer', { static: true })
    readonly innerWidthContainer: ElementRef;

    constructor(private host: ElementRef, private renderer: Renderer2) {}
}
