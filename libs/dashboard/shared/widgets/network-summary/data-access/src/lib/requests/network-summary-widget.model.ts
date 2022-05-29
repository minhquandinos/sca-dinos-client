import { ColumnsRequestModel, DateRangeRequestModel, FiltersRequestModel, PageRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface NetworkSummaryQueryParamsWidgetDto extends PageRequestModel, SortRequestModel, DateRangeRequestModel {
    preset: string;
}

export interface NetworkSummaryBodyWidgetDto extends ColumnsRequestModel, FiltersRequestModel {
    breakdown: string;
    breakdowns: string;
}
