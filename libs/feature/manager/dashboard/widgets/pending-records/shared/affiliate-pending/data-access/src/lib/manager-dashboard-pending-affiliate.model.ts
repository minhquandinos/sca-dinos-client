import { Expose } from 'class-transformer';

import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

export class ManagerDashboardPendingAffiliateModel {
    @Expose()
    id: number = undefined;

    @Expose()
    company_name: string = undefined;

    @Expose()
    created: number = undefined;
}

export interface ManagerDashboardPendingAffiliateQueryParamsModel {
    status: PlatformListsStatusesNameEnum;
    sortField: string;
    sortDirection: string;
    perPage: number;
}
