import { BreakdownEnum } from './breakdown.enum';

export interface NewStatisticBreakdownResponseModel {
    group: string;
    groupSort: number;
    key: string;
    label: string;
    sort: number;
}

export interface NewStatisticBreakdownStateModel {
    breakdown: BreakdownEnum;
}

export interface NewStatisticsGroupModel {
    group: string;
    items: NewStatisticGroupItemModel[];
}

export interface NewStatisticGroupItemModel {
    key: BreakdownEnum;
}
