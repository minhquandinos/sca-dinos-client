import { Observable } from 'rxjs';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { SheetExtensionType } from '@scaleo/platform/data';
import { BaseReport2Interface, BaseReportApiInterface, StatisticInterface, StatisticModel } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface } from '@scaleo/shared/services/filters';

export interface BaseTransactionListApiReportInterface extends BaseReportApiInterface {
    index(filters?: Filter2Interface): Observable<ApiResponseWithPagination<StatisticInterface>>;
    exportData(filters?: Filter2Interface, selectedItems?: string[]): Observable<void>;
    getColumnsOptions(): Observable<ConfigTableColumn2Model[]>;
}

export interface BaseTransactionListReportServiceInterface extends BaseReport2Interface {
    index(filters?: Filter2Interface): Observable<StatisticModel[]>;
    getColumnsOptions(): Observable<ConfigTableColumn2Model[]>;
    exportData(format: SheetExtensionType, selectedTransactions: string[]): Observable<void>;
    updateLoading(): void;
    resetStore(): void;
}
