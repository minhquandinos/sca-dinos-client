import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-table-col]',
    templateUrl: './ui-table-col.component.html'
})
export class UiTableColComponent {
    @Input() className: string;

    @ViewChild('ngContent', { static: true }) el: ElementRef;
}
