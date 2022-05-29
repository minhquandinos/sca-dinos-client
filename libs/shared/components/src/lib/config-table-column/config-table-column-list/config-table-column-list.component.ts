import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StatisticParamInterface } from '../config-table-column.model';

@Component({
    selector: 'app-config-table-column-list',
    template: `
        <ul class="config-table-column__list" [ngClass]="className">
            <app-config-table-column-item *ngFor="let param of params; let i = index" [param]="param"> </app-config-table-column-item>
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigTableColumnListComponent {
    @Input() params: StatisticParamInterface[];

    @Input() className: string;

    constructor() {}
}
