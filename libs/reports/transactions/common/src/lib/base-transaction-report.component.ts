import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { debounceTime, filter, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BaseReportComponent, BaseReportQuery } from '@scaleo/reports/common';
import { ConfigTableColumn2Component } from '@scaleo/shared/components';
import { UiTable2ColumnDirectionType } from '@scaleo/ui-kit/elements';

import { BaseTransactionListReportServiceInterface } from './base-transaction-report.interface';

@Component({
    template: ''
})
export abstract class BaseTransactionReportComponent extends BaseReportComponent<any> implements AfterViewInit, OnDestroy {
    readonly columnsOptions$ = this.service.getColumnsOptions();

    readonly newItems$ = this.query.selectAll();

    readonly pagination$ = this.query.select((state) => state.data.pagination);

    readonly loading$ = this.query.select('loading');

    readonly isInitialLoad$ = new BehaviorSubject<boolean>(false);

    readonly initialLoading$ = this.isInitialLoad$.pipe(map((isLoading) => !isLoading));

    readonly sortField$: Observable<string> = this.query.sort$.pipe(pluck('field'));

    readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.query.sort$.pipe(pluck('direction'));

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly columns$ = this.query.columns$;

    readonly updateSubject$: BehaviorSubject<unknown> = new BehaviorSubject<unknown>('');

    @ViewChild(ConfigTableColumn2Component, { static: false })
    private configTableColumn2Component: ConfigTableColumn2Component;

    protected constructor(
        @Inject('service') protected service: BaseTransactionListReportServiceInterface,
        @Inject('query') protected query: BaseReportQuery
    ) {
        super(service as any);
    }

    ngAfterViewInit() {
        this.initColumns(this.configTableColumn2Component.checkedColumn$);
        this.initItems();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected initItems(): void {
        combineLatest([this.query.prepareParams$, this.restart$, this.updateSubject$])
            .pipe(
                debounceTime(300),
                filter(([flt]) => !!flt.payload.columns),
                switchMap(([flt]) =>
                    this.service.index(flt).pipe(
                        tap(() => {
                            if (!this.isInitialLoad$.value) {
                                this.isInitialLoad$.next(true);
                            }
                        })
                    )
                ),
                tap(() => {
                    this.updateRefreshTimer();
                }),
                takeUntil(this._unsubscribe)
            )
            .subscribe();
    }

    refreshed(): void {
        this.service.updateLoading();
    }
}
