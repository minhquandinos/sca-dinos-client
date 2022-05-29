import { InjectionToken, Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

import { DashboardWidgetUnionType } from '../enum/widget.enum';

export const GRID_CONFIG_TOKEN = new InjectionToken<DashboardWidgetModel[]>('GridConfigToken');

export const DASHBOARD_COMPONENT_REF_TOKEN = new InjectionToken<Type<any>>('DashboardComponentRef');

export enum GridConfigColEnum {
    Full = 12,
    Half = 6,
    TwoThirds = 8,
    OneThird = 4
}

export enum GridConfigRowEnum {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6
}

export interface DashboardWidgetModel {
    id: DashboardWidgetUnionType | string;
    identifier: DashboardWidgetUnionType;
    title?: string;
    translateKey?: string;
    active: boolean;
    multi: boolean;
    gridConfig: GridsterItem;
    settings?: DashboardWidgetSettingsModel;
}

export interface DashboardWidgetSettingsModel {
    list?: DashboardWidgetSettingsItemModel[];
    [key: string]: any;
}

export interface DashboardWidgetSettingsItemModel {
    key: string;
    selected?: boolean;
}
