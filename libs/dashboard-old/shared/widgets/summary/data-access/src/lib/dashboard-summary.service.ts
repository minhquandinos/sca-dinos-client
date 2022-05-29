import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { ConfigTableColumnClass, StatisticOutputParameterInterface } from '@scaleo/shared/components';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { DashboardStatisticsInterface, DashboardSummaryMenuType } from './dashboard.interface';

export interface DashboardSummaryRangeDateInterface {
    rangeFrom?: string;
    rangeTo?: string;
}

export interface DashboardSummaryInterface {
    rangeDate: DashboardSummaryRangeDateInterface;
    breakdown: string;
    columns: string;
}

export interface ChartFiltersInterface {
    affiliates?: number;
    advertisers?: number;
    offers?: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardSummaryService {
    rangeDate: BehaviorSubject<DashboardSummaryRangeDateInterface> = new BehaviorSubject<DashboardSummaryRangeDateInterface>(null);

    breakdown: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    columns: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    menu: BehaviorSubject<DashboardSummaryMenuType> = new BehaviorSubject<DashboardSummaryMenuType>('volume');

    chartFilters: BehaviorSubject<ChartFiltersInterface> = new BehaviorSubject<ChartFiltersInterface>(null);

    localStorageName: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private configTableColumn: ConfigTableColumnClass;

    constructor(private readonly rest: RestApiService, private readonly http: HttpClient) {
        this.configTableColumn = new ConfigTableColumnClass(http);
    }

    getConfig(): Observable<any> {
        return combineLatest([this.rangeDate, this.breakdown, this.columns, this.menu]).pipe(debounceTime(300));
    }

    getOptions(type: 'finances' | 'volume'): Observable<StatisticOutputParameterInterface[]> {
        let optionsUrl;

        if (type === 'finances') {
            optionsUrl = 'finances-options';
        } else if (type === 'volume') {
            optionsUrl = 'volume-options';
        }

        const urlParameters = { optionsUrl };
        return this.rest
            .get<ApiResponse<StatisticOutputParameterInterface>>('dashboard-statistics-get-options', {
                urlParameters
            })
            .pipe(
                map((response) => {
                    const newParameters = this.configTableColumn.listToTree(response.info['columns-list']);
                    return newParameters.sort((a, b) => (a.groupSort > b.groupSort ? 1 : -1));
                })
            );
    }

    getStatistics(filters: Filter2Interface): Observable<DashboardStatisticsInterface> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        return this.rest
            .post<ApiResponse<DashboardStatisticsInterface>>('dashboard-statistics', payload, {
                request: { params }
            })
            .pipe(map((response) => response.info));
    }
}
