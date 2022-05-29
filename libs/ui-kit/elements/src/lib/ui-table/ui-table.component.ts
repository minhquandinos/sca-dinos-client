import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UiTableHeaderInterface, UiTableSortInterface } from './ui-table.interface';
import { UiTableHeaderThemeType } from './ui-table-header/ui-table-header.types';
import { UiTableRowComponent } from './ui-table-row/ui-table-row.component';
import { UiTableRowThemeType } from './ui-table-row/ui-table-row.types';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ui-table',
    templateUrl: './ui-table.component.html',
    styleUrls: ['./ui-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTableComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() set headers(headers: string[] | UiTableHeaderInterface[]) {
        this._headers = headers;
        this.getTableWidth();
        this.cdr.markForCheck();
    }

    @Input() hideHeader = false;

    @Input() headerPosition: 'left' | 'right' | 'center' = 'center';

    @Input() rowTemplate: TemplateRef<any>;

    @Input() overflowX: boolean;

    @Input() className: string;

    @Input() headerSticky: boolean;

    @Input() isLoad = true;

    @Input() skeletonTemplate: TemplateRef<any>;

    @Input() set colLength(num: number) {
        if (num) {
            this.colLengthForSkeleton.length = num;
        }
    }

    @Input() rowSize: 'large' | 'medium' | 'small';

    @Input() notFround = true;

    @Input() isTransparentHead = false;

    @Input() items: any[];

    @Input() set extraPath(path: string) {
        if (path) {
            this.path = `${this.path + path}.`;
        }
    }

    @Input() outputSelectedKey: string;

    @Input() trackByKey: string;

    @Input() theme: string;

    @Input() tableRowTheme: UiTableRowThemeType;

    @Input() tableHeadTheme: UiTableHeaderThemeType;

    @Input() reducedBorder: boolean;

    @Output() sorting: EventEmitter<UiTableSortInterface> = new EventEmitter<UiTableSortInterface>();

    @Output() selectedRows: EventEmitter<string[] | number[]> = new EventEmitter<string[] | number[]>();

    @ViewChild('tableHead', { static: true }) tableHead: ElementRef;

    @ViewChild('table', { static: true }) table: ElementRef;

    @ContentChildren(UiTableRowComponent) tableRows: QueryList<UiTableRowComponent>;

    _headers: string[] | UiTableHeaderInterface[];

    tableWidth: Observable<number>;

    path = 'table.column.';

    colLengthForSkeleton: number[] = [];

    unsubscribe: Subject<void> = new Subject<void>();

    constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        // this.checkTableHeader();
        this.setTableTheme();
    }

    ngAfterViewInit(): void {
        if (this.headerSticky) {
            this.renderer.addClass(this.table.nativeElement, 'table--sticky');
        }

        // this.notFound = this.tableRows.toArray().length < 1;
        //
        this.tableRows.changes.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            // console.log('tableRows', this.tableRows.toArray().length)
            // this.notFound = this.tableRows.toArray().length < 1;
            this.cdr.markForCheck();
        });

        if (this.rowSize) {
            this.renderer.addClass(this.table.nativeElement, `table--row-${this.rowSize}`);
        }

        if (this.isTransparentHead) {
            this.renderer.addClass(this.table.nativeElement, `bg-transparent-for-head`);
        }

        if (this.reducedBorder) {
            this.renderer.addClass(this.table.nativeElement, `table--reduced-row`);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.next();
    }

    getTableWidth() {
        setTimeout(() => {
            if (this.table) {
                this.tableWidth = this.table.nativeElement.offsetWidth;
            }
        }, 0);
    }

    // private checkTableHeader() {
    //     if (this._headers) {
    //         this.headersHasChildCol = this._headers.some(head => head.children);
    //         this.headersCustomConfig = this._headers.some(head => typeof head === 'object');
    //     }
    // }

    sortColumn(sort: UiTableSortInterface) {
        this.sorting.emit(sort);
    }

    selectAllRows(selected: boolean) {
        this.items = this.items.map((item) => ({
            ...item,
            selected
        }));
        this.selectedRows.emit(this.getSelectedRows);
    }

    clearSelectRows() {
        this.selectAllRows(false);
    }

    selectRow(item: any) {
        item.selected = !item.selected;
        this.selectedRows.emit(this.getSelectedRows);
    }

    get getSelectedRows(): string[] | number[] {
        return this.items && this.items.length > 0
            ? this.items.filter((item) => item.selected).map((item) => item[this.outputSelectedKey])
            : [];
    }

    trackByFn(index: number, item: any): number {
        // eslint-disable-next-line no-nested-ternary
        return this.trackByKey ? item[this.trackByKey] : item.id ? item.id : index;
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }

    private setTableTheme() {
        this.setTableHeadTheme();
        this.setTableRowTheme();
    }

    private setTableHeadTheme() {
        if (this.tableHeadTheme) {
            const className = `table-head-theme--${this.tableHeadTheme}`;
            this.renderer.addClass(this.table.nativeElement, className);
        }
    }

    private setTableRowTheme() {
        if (this.tableRowTheme) {
            const className = `table-row-theme--${this.tableRowTheme}`;
            this.renderer.addClass(this.table.nativeElement, className);
        }
    }
}
