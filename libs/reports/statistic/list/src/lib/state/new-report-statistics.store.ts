import { Inject, Injectable, Optional } from '@angular/core';
import { ID, StoreConfigOptions } from '@datorama/akita';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { LocalAsyncStorageService } from '@scaleo/core/storage/local';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import {
    BaseReportState,
    BaseReportStore,
    InitialBaseReportOptionsModel,
    initialBaseReportPersistState,
    StatisticModel
} from '@scaleo/reports/common';
import {
    REPORT_DEFAULT_FILTERS_TOKEN,
    ReportFilter,
    ReportFilterFilterEnum,
    ReportFilterModel
} from '@scaleo/reports/shared/filters/common';
import { BreakdownEnum, NewStatisticBreakdownStateModel, REPORT_STATISTIC_STORE_CONFIG_TOKEN } from '@scaleo/reports/statistic/common';
import { UiTable2ColumnsModel, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

export interface BreakdownInColumnsModel {
    id: ID;
    breakdown: BreakdownEnum;
}

interface AdditionalReportStatisticsModel {
    totals: StatisticModel;
    tableColumnsTree: UiTable2ColumnsModel[];
    breakdownColumnsTree: UiTable2ColumnsModel[];
    breakdownInColumns: BreakdownInColumnsModel[];
    breakdowns: NewStatisticBreakdownStateModel[];
    filterBreakdowns: string[];
    currency: CurrencyEnum;
}

export type NewReportStatisticsState = BaseReportState<AdditionalReportStatisticsModel> & {
    data?: { [key in keyof AdditionalReportStatisticsModel]: AdditionalReportStatisticsModel };
};

interface InitialStatisticsReportOptionsModel extends InitialBaseReportOptionsModel {
    currency: CurrencyEnum;
}

const initialNewReportStatisticsState = (options: Partial<InitialStatisticsReportOptionsModel>) =>
    createEntityInitialState({
        data: {
            totals: null,
            tableColumnsTree: [],
            breakdownColumnsTree: [],
            breakdownInColumns: [],
            breakdowns: [],
            filterBreakdowns: [],
            sort: null,
            columns: options?.columns || null,
            page: 1,
            pagination: null,
            selectedFilters: options.filters || [],
            currency: options?.currency
        }
    });

@Injectable()
export class NewReportStatisticsStore extends BaseReportStore<NewReportStatisticsState> {
    constructor(
        private profile: ProfileQuery,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        @Optional() @Inject(REPORT_STATISTIC_STORE_CONFIG_TOKEN) private readonly storeConfig: Partial<StoreConfigOptions>,
        @Optional() @Inject(REPORT_DEFAULT_FILTERS_TOKEN) private readonly defaultFilters: ReportFilterFilterEnum[],
        private readonly storage: LocalAsyncStorageService
    ) {
        super(
            initialNewReportStatisticsState({
                filters: ReportFilter.initialPageFilters(
                    storage.getItem(storeConfig?.name || 'new-report-statistics', 'filters') || defaultFilters
                ),
                currency: platformSettingsQuery.settings.currency,
                columns: storage.getItem(storeConfig?.name, 'columns')
            }),
            {
                name: storeConfig?.name || 'new-report-statistics'
            }
        );
        const storeName = storeConfig?.name || 'new-report-statistics';
        const storageName = `${profile.role}__${storeName}`;
        initialBaseReportPersistState(storeName, storageName);
    }

    updateStatisticTotals(totals: StatisticModel): void {
        this.update((state) => ({
            data: {
                ...state.data,
                totals
            }
        }));
    }

    updateStatisticPagination(pagination: ApiPaginationModel): void {
        this.update((state) => ({
            data: {
                ...state.data,
                pagination
            }
        }));
    }

    updateFilterBreakdowns(filterBreakdowns: string[]): void {
        this.update((state) => ({
            data: {
                ...state.data,
                filterBreakdowns
            }
        }));
    }

    updateFilterColumns(columns: string): void {
        this.update((state) => ({
            data: {
                ...state.data,
                columns
            }
        }));
    }

    // eslint-disable-next-line
    updateColumns(columns: string[] | string): void {}

    // eslint-disable-next-line
    updatePage(page: number): void {}

    // eslint-disable-next-line
    updatePerPage(perPage: number): void {}

    // eslint-disable-next-line
    updateSort(sort: UiTable2SortColumnModel): void {}

    // eslint-disable-next-line
    selectedFilter(filters: ReportFilterModel[]): void {}

    // eslint-disable-next-line
    updatePagination() {}
}
