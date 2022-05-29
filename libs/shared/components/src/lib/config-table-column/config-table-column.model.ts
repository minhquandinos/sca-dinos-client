// import { BasicStatisticParamInterface } from '@scaleo/reports/common';

import { BooleanEnum } from '@scaleo/core/data';

export interface StatisticOutputParameterInterface {
    column: number;
    default: BooleanEnum;
    group: string;
    groupSort: number;
    key: string;
    label: string;
    level: number;
    parent: string;
    reportSort: number;
    sort: number;
    items: StatisticParamInterface[];
    keyForTooltip?: string;
}

export interface StatisticParamInterface {
    // extends BasicStatisticParamInterface
    // group: string;
    label: string;
    key: string;
    sort: number;
    groupSort: number;
    reportSort: number;
    selected: boolean;
    default: number;
    parent?: string;
    level?: number;
    children?: StatisticParamInterface[];
    keyForTooltip?: string;
}
