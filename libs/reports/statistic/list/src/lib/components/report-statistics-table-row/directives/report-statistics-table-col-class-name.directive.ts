import { Directive, Input, Renderer2 } from '@angular/core';

import { UiTable2ColComponent, UiTable2ColumnDataAttributesModel } from '@scaleo/ui-kit/elements';

@Directive({
    selector: '[appReportStatisticsTableColClassName]'
})
export class ReportStatisticsTableColClassNameDirective {
    @Input() set dataAttributes(value: UiTable2ColumnDataAttributesModel[]) {
        if (value) {
            this.setAttribute(value);
        }
    }

    // TODO refactor setAttribute method for this method and fix bug when col don`t update
    @Input() set index(index: number) {
        this._index = index;
        // const headerCol = this.document.querySelector(`[data-column-index="${index}"][data-column-level="2"]`);
        // console.log('index', index, headerCol);
        // if (headerCol) {
        //     const group = headerCol.getAttribute('data-statistic-group');
        //
        //     if (group) {
        //         this.renderer2.setAttribute(this.host.containerRef.nativeElement, 'data-statistic-group', group);
        //     }
        // } else {
        //     this.renderer2.removeAttribute(this.host.containerRef.nativeElement, 'data-statistic-group');
        // }
        // this.cdr.markForCheck();
    }

    _index: number;

    constructor(
        private host: UiTable2ColComponent,
        private renderer2: Renderer2 // @Inject(DOCUMENT) private document: HTMLDocument
    ) {}

    private setAttribute(attributes: UiTable2ColumnDataAttributesModel[]) {
        if (attributes?.length > 0) {
            attributes.forEach((attr) => {
                const key = Object.keys(attr)[0];
                this.renderer2.setAttribute(this.host.containerRef.nativeElement, key, attr[key]);
            });
        } else {
            const elAttributes = this.host.containerRef.nativeElement.attributes;
            if (elAttributes.length > 0) {
                Object.keys(elAttributes).forEach((el) => {
                    if (elAttributes[el]?.name) {
                        this.renderer2.removeAttribute(this.host.containerRef.nativeElement, elAttributes[el].name as string);
                    }
                });
            }
        }
    }
}
