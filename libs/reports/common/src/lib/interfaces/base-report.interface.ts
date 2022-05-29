import { Observable, Subject } from 'rxjs';

import { BasePagination } from '@scaleo/core/classes';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { SheetExtensionType } from '@scaleo/platform/data';
import { GetReportFiltersInterface, ReportFilterModel, ReportFiltersSelectedInterface } from '@scaleo/reports/shared/filters/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { StatisticModel } from '../model';

export interface BaseReportInterface extends BasePagination {
    updateColumns(columns: string[] | string): void;
    updateSort(sort: UiTable2SortColumnModel): void;
    updateColumnsSubject$?: Subject<string>;
    selectedFilter: (filters: ReportFilterModel[]) => void;
    updatePagination: (pagination: ApiPaginationModel) => void;
}

export interface BaseReport2Interface extends BasePagination, BasePagination, GetReportFiltersInterface, ReportFiltersSelectedInterface {
    updateColumns(columns: string[] | string): void;
    updateSort(sort: UiTable2SortColumnModel): void;
    updateColumnsSubject$?: Subject<string>;
    selectedFilter: (filters: ReportFilterModel[]) => void;
    updatePagination: (pagination: ApiPaginationModel) => void;
}

export interface BaseReportComponentInterface
    extends BasePagination,
        BasePagination,
        GetReportFiltersInterface,
        ReportFiltersSelectedInterface {
    updateColumns(columns: string[] | string): void;
    updateSort(sort: UiTable2SortColumnModel): void;
    updateColumnsSubject$?: Subject<string>;
    selectedFilter: (filters: ReportFilterModel[]) => void;
    updatePagination: (pagination: ApiPaginationModel) => void;
}

export interface BaseReportServiceInterface {
    index(columns: string[] | string): Observable<StatisticModel[]>;
    getColumnsOptions(): Observable<ConfigTableColumn2Model[]>;
    exportData(format: SheetExtensionType, selectedTransactions: string[]): Observable<void>;
}
