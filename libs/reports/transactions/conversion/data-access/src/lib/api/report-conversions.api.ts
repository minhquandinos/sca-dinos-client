import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { BaseReportApi, ReportPagesEnum, StatisticGroupFiltersInterface, StatisticInterface } from '@scaleo/reports/common';
import { BaseTransactionListApiReportInterface } from '@scaleo/reports/transactions/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface, Post2FiltersInterface, QueryHelper } from '@scaleo/shared/services/filters';
import { rxjsOperatorsUtil, Util } from '@scaleo/utils';

@Injectable({ providedIn: 'root' })
export class ReportConversionsApi extends BaseReportApi implements BaseTransactionListApiReportInterface {
    public filters$ = new BehaviorSubject<StatisticGroupFiltersInterface>(null);

    constructor(protected rest: RestApiService) {
        super(rest, ReportPagesEnum.Conversions);
    }

    public index(filters?: Filter2Interface): Observable<ApiResponseWithPagination<StatisticInterface>> {
        if (filters?.payload?.columns?.length > 0) {
            const haveTransactionIdInColumn = filters.payload.columns.split(',').find((el) => el === 'transaction_id');
            if (!haveTransactionIdInColumn) {
                const columns: string[] = filters.payload.columns.split(',');
                columns.push('transaction_id');
                filters.payload.columns = columns.join(',');
            }
        }

        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.post<ApiResponse<StatisticInterface>>('reports-conversions', payload, options).pipe(
            map((response) => ResponseUtil.pagination(response.headers, response.body.info.transactions)),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    public exportData(filters?: Filter2Interface, selectedItems?: string[]): Observable<any> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        let payload = QueryHelper.filtersBodyParams(filters.payload);
        payload = ReportConversionsApi.prepareTransactions(payload, selectedItems);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response',
                responseType: 'arrayBuffer'
            }
        };

        return this.rest.post('reports-conversions-export', payload, options);
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get('reports-conversions-options').pipe(pluck('info', 'columns-list'), shareReplay());
    }

    private static prepareTransactions(payload: Post2FiltersInterface, selectedItems?: string[]): Post2FiltersInterface {
        if (selectedItems && selectedItems.length > 0) {
            const transactions: string = selectedItems.join(',');
            const newPayload = Util.cloneDeep(payload);
            return {
                ...newPayload,
                filters: {
                    ...newPayload.filters,
                    transactions
                }
            };
        }

        return payload;
    }
}
