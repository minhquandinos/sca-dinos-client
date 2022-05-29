import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigTableColumnComponent } from '../../../config-table-column/config-table-column.component';
import { ConfigTableColumn2Model } from '../../models/config-table-column2.model';

@Component({
    selector: 'app-config-table-column2-item',
    templateUrl: './config-table-column2-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigTableColumn2ItemComponent implements OnInit {
    @Input() param: ConfigTableColumn2Model;

    configTableColumnComponent: ConfigTableColumnComponent;

    disabled: Observable<boolean>;

    require: Observable<boolean>;

    constructor() {}

    ngOnInit(): void {}
}
