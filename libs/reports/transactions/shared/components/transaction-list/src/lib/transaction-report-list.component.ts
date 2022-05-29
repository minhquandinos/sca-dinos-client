import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    SelectRowModel,
    UiTable2ColTemplateDirective,
    UiTable2ColumnDirectionType,
    UiTable2ColumnsModel,
    UiTable2Component,
    UiTable2SortColumnModel
} from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-transaction-report-list',
    templateUrl: './transaction-report-list.component.html',
    providers: [UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionReportListComponent implements AfterViewInit {
    @Input() columns: UiTable2ColumnsModel[];

    @Input() items: unknown[];

    @Input() sortDirection: UiTable2ColumnDirectionType;

    @Input() sortField: string;

    @Input() loading: boolean;

    @Input() controlTemplate?: TemplateRef<unknown>;

    @Input() keyForSelectItemValue?: string;

    @Input() showSelect?: boolean;

    @Input()
    rowTemplate: TemplateRef<any>;

    @Output() sorting: EventEmitter<UiTable2SortColumnModel> = new EventEmitter<UiTable2SortColumnModel>();

    @Output() selectItems: EventEmitter<string[]> = new EventEmitter<string[]>();

    hasSelectedItems: boolean;

    @ViewChild(UiTable2Component) private readonly table2Component: UiTable2Component;

    // @ContentChildren(UiTable2ColTemplateDirective) columnTemplates: QueryList<UiTable2ColTemplateDirective>;

    constructor(private readonly unsubscribe: UnsubscribeService, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        // this.columnTemplates.changes.pipe(startWith(this.columnTemplates), takeUntil(this.unsubscribe)).subscribe((columnTemplates) => {
        //     this.table2Component.columnTemplates = columnTemplates;
        //     this.table2Component.setColumnTemplatesMap();
        // });
    }

    sortWasChanged(sort: UiTable2SortColumnModel): void {
        this.sorting.emit(sort);
    }

    selectAll(selected: SelectRowModel<string>[]): void {
        const selectedItems = selected.map((item) => item.value);
        this.emitSelectedItems(selectedItems);
    }

    clearSelected(): void {
        this.table2Component.clearSelected();

        this.emitSelectedItems([]);
    }

    private emitSelectedItems(items: string[]): void {
        this.hasSelectedItems = !!items.length;
        this.selectItems.emit(items);
    }
}
