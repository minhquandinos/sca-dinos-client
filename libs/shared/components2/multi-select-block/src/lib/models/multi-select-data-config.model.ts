import { ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';

import { MultiSelectBlockQueryParamsType } from '../types/multi-select-block.type';

export interface MultiSelectDataConfigModel {
    serviceName: keyof Record<ShortEntityNameEnum, string>;
    queryParams?: MultiSelectBlockQueryParamsType;
}
