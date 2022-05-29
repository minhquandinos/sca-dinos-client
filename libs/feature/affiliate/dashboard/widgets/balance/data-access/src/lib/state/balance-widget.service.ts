import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { WidgetServiceInterface } from '@scaleo/dashboard/common';

import { BalanceWidgetApi } from '../api/balance-widget.api';
import { BalanceInvoicesWidgetModel } from '../models/balance-widget.model';
import { BalanceWidgetQuery } from './balance-widget.query';
import { BalanceWidgetStore } from './balance-widget.store';

@Injectable()
export class BalanceWidgetService implements WidgetServiceInterface<BalanceInvoicesWidgetModel> {
    widgetSubject$: Subject<any> = new Subject<any>();

    constructor(private api: BalanceWidgetApi, private store: BalanceWidgetStore, private query: BalanceWidgetQuery) {}

    get widgetData$(): Observable<BalanceInvoicesWidgetModel> {
        return this.get();
    }

    get data$(): Observable<BalanceInvoicesWidgetModel> {
        return this.query.select();
    }

    get loading$(): Observable<boolean> {
        return this.query.selectLoading().pipe(map((loading) => !loading));
    }

    private get(): Observable<BalanceInvoicesWidgetModel> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => this.api.getBalance()),
            tap((balance) => {
                this.store.update(balance);
            })
        );
    }
}
