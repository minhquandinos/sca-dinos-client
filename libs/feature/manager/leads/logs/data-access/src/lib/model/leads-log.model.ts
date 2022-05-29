import { BaseObjectModel, ColumnsRequestModel, DateRangeRequestModel, PageRequestModel, SortRequestModel } from '@scaleo/core/data';

export const enum LeadsLogEnum {
    Incoming = 'incoming',
    Outgoing = 'outgoing',
    Changing = 'changing'
}

export enum LeadsLogsFiltersEnum {
    Affiliates = 'affiliates',
    Offers = 'offers'
}

export type LeadsLogModel = BaseObjectModel<string, string>;

export type LeadsLogQueryParamsModel = SortRequestModel & PageRequestModel;

export interface LeadsLogPayloadModel extends ColumnsRequestModel, DateRangeRequestModel {
    logType: LeadsLogEnum;
    filters: {
        [key in LeadsLogsFiltersEnum]: number[];
    };
}

export interface LeadsLogPayloadDto extends Omit<LeadsLogPayloadModel, 'filters'> {
    filters: {
        [key in LeadsLogsFiltersEnum]: string;
    };
}
