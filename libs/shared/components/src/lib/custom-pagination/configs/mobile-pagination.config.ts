import { getConfig } from '@scaleo/utils';

import { PaginationConfigModel } from '../models/pagination-config.model';

const config: PaginationConfigModel = {
    limitTotalPages: 5,
    middlePageOfThePaginator: 3,
    pagesAfterGoingMiddlePageToStart: 2,
    pagesAfterGoingMiddlePageToEnd: 2
};

export const mobilePaginationConfig = getConfig<PaginationConfigModel>(config);
