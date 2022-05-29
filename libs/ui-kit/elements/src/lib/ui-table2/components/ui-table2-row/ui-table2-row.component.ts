import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

import { RowSizeType } from '../..';

@Component({
    selector: 'ui-table2-row',
    templateUrl: './ui-table2-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2RowComponent implements AfterViewInit {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() className: string;

    @Input() rowSize: RowSizeType = 'small';

    @ViewChild('elementRef') elementRef: ElementRef;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (this.rowSize) {
            if (typeof this.rowSize === 'object') {
                const { size, units } = this.rowSize;
                this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${size}${units}`);
            }

            if (typeof this.rowSize !== 'object') {
                this.renderer.addClass(this.elementRef.nativeElement, `table2__row-size-${this.rowSize}`);
            }
        }
    }
}
