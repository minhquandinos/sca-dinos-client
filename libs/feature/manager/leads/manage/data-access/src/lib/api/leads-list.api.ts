import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { BaseReportApi } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { LeadsListModel } from '../models/leads-list.model';

@Injectable()
export class LeadsListApi extends BaseReportApi {
    constructor(protected override rest: RestApiService) {
        super(rest, 'leads-list');
    }

    get(filters: Filter2Interface): Observable<ApiResponseWithPagination<LeadsListModel[]>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.post<ApiResponse<LeadsListModel[]>>('leads-list', payload, options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { transactions }
                    }
                }) => ResponseUtil.pagination(headers, transactions)
            )
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get('leads-list-options').pipe(pluck('info', 'columns-list'), shareReplay());
    }

    deliverAgain(selectedTransactions: string[]): Observable<unknown> {
        const transactions = selectedTransactions.join(',');
        const post = {
            transaction_ids: transactions
        };
        return this.rest.post<unknown>('leads-deliver-again', post);
    }
}
