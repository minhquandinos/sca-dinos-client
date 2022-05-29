import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

import { MultiSelectStoreItemsType } from '../types/multi-select-store-items.type';

export interface MultiSelectStoreItemModel {
    items?: MultiSelectStoreItemsType[];
    pagination?: ApiPaginationModel;
    selected?: MultiSelectStoreItemsType[];
    tempSelected?: MultiSelectStoreItemsType[];
}
