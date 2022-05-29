import { Component, ElementRef, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-table-row]',
    templateUrl: './ui-table-row.component.html',
    styleUrls: ['./ui-table-row.component.css']
})
export class UiTableRowComponent {
    @Input() character: any;

    @Input() columns: string[];

    constructor(public elementRef: ElementRef) {}
}
