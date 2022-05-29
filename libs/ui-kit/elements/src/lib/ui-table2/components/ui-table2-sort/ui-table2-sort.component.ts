import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UiTable2ColumnSortService } from '../../services/ui-table2-column-sort.service';

@Component({
    selector: 'ui-table2-sort',
    templateUrl: './ui-table2-sort.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2SortComponent {
    @Input() value: string;

    sort$ = this.columnSort.sort$;

    constructor(private columnSort: UiTable2ColumnSortService) {}
}
