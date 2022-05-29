import { PageRequestModel, SortRequestModel } from '@scaleo/core/data';

export interface BaseFindRequestModel extends PageRequestModel, SortRequestModel {
    search?: string;
    exact?: string;
    [key: string]: unknown;
}
