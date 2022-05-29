import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ColumnTypesEnum, UiTable2SortTypes, UiTableHeaderInterface, UiTableSortInterface } from '../ui-table.interface';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[ui-thead]',
    templateUrl: './ui-table-header.component.html'
})
export class UiTableHeaderComponent {
    @Output() sortColumn: EventEmitter<UiTableSortInterface> = new EventEmitter<UiTableSortInterface>();

    @Output() selectAllRows: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() set headers(headers: UiTableHeaderInterface[] | string[]) {
        if (headers) {
            this._headers = headers.map((header) => {
                if (typeof header !== 'string') {
                    header.styleClassForSpan = this.setClassForSpan(header);
                    if (header.children?.length > 0) {
                        header.children = header.children.map((headerChild) => {
                            if (headerChild?.sort) {
                                headerChild.styleClassForSpan = this.setClassForSpan(headerChild);
                            }
                            return headerChild;
                        });
                    }
                }
                return header;
            });
            if (this._headers.some((head) => typeof head === 'string')) {
                this.headersType = 'default';
            } else {
                this.headersType = this._headers.some((head) => head.children && head.children.length > 0) ? 'level2' : 'level1';
            }
        }
    }

    @Input() path: string;

    @Input() selectedAllRowsStatus: boolean;

    @Input() selectedAnyRowsStatus: boolean;

    _headers: UiTableHeaderInterface[] | any[];

    headersType: 'level1' | 'level2' | 'default' = 'default';

    columnTypes = ColumnTypesEnum;

    sort(canSort: boolean, column: UiTableHeaderInterface) {
        if (canSort) {
            this.addDirection(column.value);

            const newDirection = this.changeSort(column.direction);
            const newSort: UiTableSortInterface = {
                field: column.value,
                direction: newDirection
            };
            this.sortColumn.emit(newSort);
        }
    }

    toggleSelectingAllRows(event: any) {
        this.selectAllRows.emit(event.target.checked);
    }

    changeSort(direction: UiTable2SortTypes): UiTable2SortTypes {
        return direction === 'desc' ? 'asc' : 'desc';
    }

    addDirection(key: string) {
        switch (this.headersType) {
            case 'level1':
                this.sortLevel1(key);
                break;
            case 'level2':
                this.sortLevel2(key);
                break;
            default:
                break;
        }
    }

    private sortLevel1(key: string) {
        this._headers = this._headers.map((header) => {
            const newHeader = {
                ...header,
                direction: header.value === key ? this.changeSort(header.direction) : null
            };

            return {
                ...newHeader,
                styleClassForSpan: this.setClassForSpan(newHeader)
            };
        });
    }

    public setClassForSpan(column: UiTableHeaderInterface): string {
        return (
            (column?.sort ? 'table__header-sort' : '') +
            (column?.sort && column?.direction ? ' table__header-sorted' : '') +
            (column?.textAlign ? ` text-${column.textAlign}` : '') +
            (column?.textAlign === 'right' ? ` table__header-value-right` : '')
        );
    }

    private sortLevel2(key: string) {
        this._headers = this._headers.map((element) => ({
            ...element,
            children: element.children.map((childElement: any) => ({
                ...childElement,
                direction: childElement.value === key ? this.changeSort(childElement.direction) : null
            }))
        }));
    }
}
