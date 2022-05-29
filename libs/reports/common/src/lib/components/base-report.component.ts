import { Component, Inject, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { BasePagination } from '@scaleo/core/classes';
import { ServiceLocator } from '@scaleo/core/locator/service';
import {
    GetReportFiltersInterface,
    ReportFilterModel,
    ReportFiltersInterface,
    ReportFiltersSelectedInterface
} from '@scaleo/reports/shared/filters/common';
import { ReportExportComponent, ReportLastUpdatedComponent } from '@scaleo/shared/components';
import { ToastrBarService, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';
import { fileUtil } from '@scaleo/utils';

import { BaseReportInterface } from '../interfaces';

@Component({ template: '' })
export abstract class BaseReportComponent<
    T extends BaseReportInterface & BasePagination & GetReportFiltersInterface & ReportFiltersSelectedInterface
> implements OnDestroy
{
    @ViewChild(ReportLastUpdatedComponent)
    set _reportLastUpdatedComponent(value: ReportLastUpdatedComponent) {
        if (value && !this.reportLastUpdatedComponent) {
            this.reportLastUpdatedComponent = value;
            this.reportLastUpdatedComponent$.next(this.reportLastUpdatedComponent);
        }
    }

    @ViewChild(ReportLastUpdatedComponent, { static: true })
    testReportLastUpdatedComponent: ReportLastUpdatedComponent;

    @ViewChild('layoutHeaderTpl', { static: true })
    layoutHeaderTpl: TemplateRef<any>;

    reportLastUpdatedComponent: ReportLastUpdatedComponent;

    private _filtersSelected$: BehaviorSubject<ReportFiltersInterface[]> = new BehaviorSubject<ReportFiltersInterface[]>([]);

    getFilters$ = this.service.getFilters$.pipe(
        tap((filters) => {
            this._filtersSelected$.next(filters);
        })
    );

    filtersSelected$ = this._filtersSelected$.pipe(
        switchMap((filters) => {
            return this.service.filtersSelected$.pipe(
                map((filtersSelected) => {
                    return filtersSelected.filter((item) => {
                        return filters.some((elem) => elem.items.some((elem2) => elem2.filter === item.filter));
                    });
                })
            );
        })
    );

    reportLastUpdatedComponent$: BehaviorSubject<ReportLastUpdatedComponent> = new BehaviorSubject<ReportLastUpdatedComponent>(null);

    protected readonly toastr: ToastrBarService;

    private translateService: TranslateService;

    protected _unsubscribe: Subject<void> = new Subject();

    @ViewChild(ReportExportComponent) protected reportExportComponent: ReportExportComponent;

    protected constructor(@Inject('service') protected service: T) {
        this.toastr = ServiceLocator.injector.get(ToastrBarService);
        this.translateService = ServiceLocator.injector.get(TranslateService);
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
        this.resetPagination();
    }

    get restart$(): Observable<boolean> {
        return this.reportLastUpdatedComponent$.pipe(switchMap((comp) => (comp?.restart$ ? comp?.restart$ : of(false))));
    }

    protected updateRefreshTimer(): void {
        this.reportLastUpdatedComponent.updated();
    }

    pageWasChanged(page: number): void {
        this.service.updatePage(page);
    }

    perPageWasChanged(perPage: number): void {
        this.service.updatePerPage(perPage);
    }

    sortWasChanged(sort: UiTable2SortColumnModel): void {
        this.pageWasChanged(1);
        this.service.updateSort(sort);
    }

    columnWasChanged(columns: string[]): void {
        this.pageWasChanged(1);
        this.service.updateColumns(columns);
    }

    exportDataToFile(observable$: Observable<any>): void {
        observable$.pipe(take(1)).subscribe({
            next: (response) => {
                fileUtil.createFile(response);
                if (this.reportExportComponent) {
                    this.reportExportComponent.complete();
                }
            },
            error: (error) => {
                console.log(error);
                this.toastr.error(this.translateService.instant('interface.export_file.exception'));
                this.reportExportComponent.complete();
            }
        });
    }

    initColumns(columns$: Observable<string[]>): void {
        columns$
            .pipe(
                filter((columns) => columns.length > 0),
                tap((columns) => {
                    if (columns.length > 0) {
                        this.columnWasChanged(columns);
                    }
                }),
                take(1),
                takeUntil(this._unsubscribe)
            )
            .subscribe();
    }

    changedFilters(filters: ReportFilterModel[]): void {
        this.pageWasChanged(1);
        this.service.selectedFilter(filters);
    }

    private resetPagination(): void {
        this.pageWasChanged(1);
        this.perPageWasChanged(25);
    }
}
