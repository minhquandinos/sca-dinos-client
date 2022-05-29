import { Component, Input } from '@angular/core';

import { ConfigTableColumn2Model } from '../../models/config-table-column2.model';

@Component({
    selector: 'app-config-table-column2-list',
    template: `
        <ul class="config-table-column__list" [ngClass]="className">
            <app-config-table-column2-item *ngFor="let param of params; let i = index" [param]="param"> </app-config-table-column2-item>
        </ul>
    `
})
export class ConfigTableColumn2ListComponent {
    @Input() params: ConfigTableColumn2Model[];

    @Input() className: string;
}
