import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { BalanceInvoicesWidgetModel } from '../models/balance-widget.model';

@Injectable()
export class BalanceWidgetApi {
    constructor(private rest: RestApiService) {}

    getBalance(): Observable<BalanceInvoicesWidgetModel> {
        return this.rest.get<ApiResponse<BalanceInvoicesWidgetModel>>('dashboard-balance').pipe(pluck('info'));
    }
}
