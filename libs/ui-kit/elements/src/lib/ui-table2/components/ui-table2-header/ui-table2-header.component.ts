import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { UiTable2ColumnsModel } from '../..';
import { UiTable2ColumnSelectService } from '../../services/ui-table2-column-select.service';

@Component({
    selector: 'ui-table2-header',
    templateUrl: './ui-table2-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2HeaderComponent {
    @HostBinding('class') hostClass = 'd-contents';

    @Input() columns: UiTable2ColumnsModel[];

    @Input() level: number;

    @Input() withControl: boolean;

    showSelect$ = combineLatest([this.columnSelectService.showSelect$, this.columnSelectService.singleSelect$]).pipe(
        debounceTime(0),
        map(([show, single]) => show && !single)
    );

    constructor(private columnSelectService: UiTable2ColumnSelectService) {}
}
