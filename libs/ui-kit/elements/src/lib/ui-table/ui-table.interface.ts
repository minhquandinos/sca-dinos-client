import { TemplateRef } from '@angular/core';

export interface UiTableInterface {
    header: UiTableHeaderInterface[];
    body: UiTableRowInterface[];
}

export interface UiTableHeaderInterface {
    value: any;
    key?: any;
    translateKey?: any;
    tooltipTranslateKey?: string;
    tooltipDisplay?: boolean;
    position?: string;
    styleClass?: string;
    hidden?: boolean;
    sort?: boolean;
    direction?: UiTable2SortTypes;
    isBreakdown?: boolean;
    children?: UiTableHeaderInterface[];
    colspan?: number;
    context?: any;
    template?: TemplateRef<any>;
    type?: 'checkbox' | 'text';
    colWidth?: string;
    textAlign?: 'center' | 'left' | 'right' | string;
    styleClassForSpan?: string;
}

export interface UiTableRowInterface {
    name: string;
}

export type UiTable2SortTypes = 'asc' | 'desc';

export interface UiTableSortInterface {
    field: string;
    direction: UiTable2SortTypes;
}

export enum ColumnTypesEnum {
    Checkbox = 'checkbox',
    Text = 'text'
}
