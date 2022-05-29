import { UnitsType } from '@scaleo/core/data';

export interface SelectRowModel<T = unknown> {
    position: number;
    value: T;
}

export type UiTable2HeaderSelectAllStatusType = UiTable2HeaderSelectAllStatusEnum.Checked | UiTable2HeaderSelectAllStatusEnum.Unchecked;

export enum UiTable2HeaderSelectAllStatusEnum {
    Checked = 'checked',
    Unchecked = 'unchecked'
}

export enum RowSizeEnum {
    Small = 'small',
    Medium = 'medium'
}

export type RowSizeType = 'small' | 'medium' | { size: number; units: UnitsType };
