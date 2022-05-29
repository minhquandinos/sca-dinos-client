import { getConfig } from '@scaleo/utils';

import { PaginationConfigModel } from '../models/pagination-config.model';

const config: PaginationConfigModel = {
    limitTotalPages: 10,
    middlePageOfThePaginator: 6,
    pagesAfterGoingMiddlePageToStart: 5,
    pagesAfterGoingMiddlePageToEnd: 4
};

export const defaultPaginationConfig = getConfig<PaginationConfigModel>(config);
