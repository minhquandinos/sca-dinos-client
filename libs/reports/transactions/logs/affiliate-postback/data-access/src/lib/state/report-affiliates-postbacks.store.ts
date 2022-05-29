import { Inject, Injectable, Optional } from '@angular/core';
import { StoreConfig, StoreConfigOptions } from '@datorama/akita';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { BaseReportState, BaseReportStore, initialBaseReport, initialBaseReportPersistState } from '@scaleo/reports/common';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilter, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';

export type ReportAffiliatesPostbacksState = BaseReportState;

@Injectable()
@StoreConfig({ name: ManagerStateNameEnum.ReportAffiliatesPostbacks })
export class ReportAffiliatesPostbacksStore extends BaseReportStore<ReportAffiliatesPostbacksState> {
    constructor(
        private profile: ProfileQuery,
        @Optional() @Inject(TRANSACTION_REPORT_STORE_CONFIG_TOKEN) private readonly storeConfig: StoreConfigOptions,
        @Optional() @Inject(REPORT_DEFAULT_FILTERS_TOKEN) private readonly defaultFilters: ReportFilterFilterEnum[]
    ) {
        super(
            initialBaseReport({
                filters: ReportFilter.initialPageFilters(defaultFilters)
            }),
            {
                name: storeConfig?.name || 'report-affiliate-postback-list'
            }
        );
        const storeName = storeConfig?.name || 'report-affiliate-postback-list';
        const storageName = `${profile.role}__${storeName}`;
        initialBaseReportPersistState(storeName, storageName);
    }
}
