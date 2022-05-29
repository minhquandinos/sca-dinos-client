import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-filter',
    template: ` <div class="filter__box" [ngClass]="className">
        <ng-content></ng-content>
    </div>`
})
export class FilterComponent {
    @Input() className = '';

    constructor() {}
}
