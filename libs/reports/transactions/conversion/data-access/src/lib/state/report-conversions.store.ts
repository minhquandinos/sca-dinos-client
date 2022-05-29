import { Inject, Injectable, Optional } from '@angular/core';
import { StoreConfigOptions } from '@datorama/akita';

import { ProfileQuery } from '@scaleo/account/data-access';
import { LocalAsyncStorageService } from '@scaleo/core/storage/local';
import { BaseReportState, BaseReportStore, initialBaseReport, initialBaseReportPersistState } from '@scaleo/reports/common';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilter, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';

export type ReportConversionsState = BaseReportState;

@Injectable()
export class ReportConversionsStore extends BaseReportStore<ReportConversionsState> {
    constructor(
        private profile: ProfileQuery,
        @Optional() @Inject(TRANSACTION_REPORT_STORE_CONFIG_TOKEN) private readonly storeConfig: Partial<StoreConfigOptions>,
        @Optional() @Inject(REPORT_DEFAULT_FILTERS_TOKEN) private readonly defaultFilters: ReportFilterFilterEnum[],
        private readonly storage: LocalAsyncStorageService
    ) {
        super(
            initialBaseReport({
                filters: ReportFilter.initialPageFilters(
                    storage.getItem(storeConfig?.name || 'conversion-report-list', 'filters') || defaultFilters
                ),
                columns: storage.getItem(storeConfig?.name, 'columns')
            }),
            {
                name: storeConfig?.name || 'report-conversions'
            }
        );

        const storeName = storeConfig?.name || 'conversion-report-list';
        const storageName = `${profile.role}__${storeName}`;
        initialBaseReportPersistState(storeName, storageName);
    }
}
