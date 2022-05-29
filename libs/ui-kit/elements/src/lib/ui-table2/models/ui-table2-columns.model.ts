import { TemplateRef } from '@angular/core';

import { MediaQueryEnum } from '@scaleo/core/media-watcher/service';

type UiTable2ColumnsResponsiveModel = Pick<UiTable2ColumnsModel, 'width' | 'minWidth' | 'maxWidth'>;

export interface UiTable2ColumnsModel extends UiTable2ColumnTooltipModel {
    value: any;
    translate: any;
    sort?: boolean;
    sortValue?: string;
    colspan?: number;
    colWidth?: string;
    minWidth?: string;
    maxWidth?: string;
    align?: 'center' | 'left' | 'right';
    className?: string;
    inlineStyle?: string;
    children?: UiTable2ColumnsModel[];
    hidden?: boolean;
    isBreakdown?: boolean;
    dataAttributes?: UiTable2ColumnDataAttributesModel[];
    responsive?: {
        [K in keyof typeof MediaQueryEnum]?: {
            style?: Partial<UiTable2ColumnsResponsiveModel>;
        };
    };
    [key: string]: any;
}

export interface UiTable2ColumnTooltipModel {
    tooltipKey?: string;
    tooltip?: boolean;
    tooltipTranslate?: string;
    tooltipTpl?: TemplateRef<any>;
    tooltipType?: UiTable2ColumnTooltipType;
}

export enum UiTable2ColumnTooltipTypeEnum {
    Default = 'default',
    Info = 'info'
}

export type UiTable2ColumnTooltipType = keyof Record<UiTable2ColumnTooltipTypeEnum, string>;

export type UiTable2ColumnDirectionType = 'asc' | 'desc';

export interface UiTable2SortColumnModel<F = string | any> {
    field: F;
    direction: UiTable2ColumnDirectionType;
}

export interface UiTable2SortModel {
    current: UiTable2SortColumnModel;
    previous: UiTable2SortColumnModel;
}

export interface UiTable2ColumnDataAttributesModel {
    [key: string]: string;
}

export interface UiTable2CustomColumnTemplate {
    [key: string]: {
        tpl: TemplateRef<any>;
        className?: string;
        innerClassName?: string;
    };
}

export interface UiTable2CustomColumnTranslate {
    [key: string]: string;
}
