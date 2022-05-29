import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { UiTable2ColumnsModel } from '../..';
import { UiTable2ColumnSortService } from '../../services/ui-table2-column-sort.service';

@Component({
    selector: 'ui-table2-header-col-item',
    templateUrl: './ui-table2-header-col-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTable2HeaderColItemComponent implements OnInit {
    @HostBinding('class') hostClass = 'd-flex';

    @Input() column: UiTable2ColumnsModel;

    sortDisplay$ = this.columnSort.sortDisplay$.pipe(debounceTime(0));

    showSort = true;

    sort$ = this.columnSort.sort$;

    constructor(private columnSort: UiTable2ColumnSortService) {}

    ngOnInit(): void {
        this.showSortChecker();
    }

    showSortChecker() {
        if (this.column.sort === false) {
            this.showSort = false;
        }
    }

    sortHandler() {
        if (this.showSort) {
            const { value = undefined, sortValue = undefined } = this.column || {};
            this.columnSort.updateColumnSort(sortValue || value);
        }
    }
}
