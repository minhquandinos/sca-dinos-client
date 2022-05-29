import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs';
import { debounceTime, filter, map, pluck, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { LeadsListQuery, LeadsListService, MANAGER_LEADS_MANAGE_PROVIDER } from '@scaleo/feature/manager/leads/manage/data-access';
import { ConversionEditModalComponent } from '@scaleo/feature/manager/reports/transactions/conversion/upsert/modal-form';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseReportComponent } from '@scaleo/reports/common';
import { TransactionReportListComponent } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { animationRules } from '@scaleo/shared/animations';
import { ConfigTableColumn2Component } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2ColumnDirectionType } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-leads-list',
    templateUrl: './leads-list.component.html',
    animations: [animationRules.fade()],
    styleUrls: ['./leads-list.component.scss'],
    providers: [UnsubscribeService, MANAGER_LEADS_MANAGE_PROVIDER],
    encapsulation: ViewEncapsulation.None
})
export class LeadsListComponent extends BaseReportComponent<LeadsListService> implements AfterViewInit, OnDestroy {
    readonly items$ = this._query.selectAll();

    readonly loading$ = this._query.select('loading');

    readonly isInitialLoad$ = new BehaviorSubject<boolean>(false);

    readonly initialLoading$ = this.isInitialLoad$.pipe(map((isLoading) => !isLoading));

    readonly columns$ = this._query.columns$;

    readonly pagination$ = this._query.select((state) => state.data.pagination);

    readonly columnsOptions$ = this.service.getColumnsOptions();

    readonly sortField$: Observable<string> = this._query.sort$.pipe(pluck('field'));

    readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this._query.sort$.pipe(pluck('direction'));

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    readonly updateSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    selectedItems: string[] = [];

    @ViewChild(TransactionReportListComponent)
    private set _transactionReportListComponent(component: TransactionReportListComponent) {
        if (!this.transactionReportListComponent && component) {
            this.transactionReportListComponent = component;
            this._cdr.detectChanges();
        }
    }

    transactionReportListComponent: TransactionReportListComponent;

    @ViewChild(ConfigTableColumn2Component, { static: false })
    private readonly _configTableColumn2Component: ConfigTableColumn2Component;

    constructor(
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        protected override readonly service: LeadsListService,
        protected override readonly _unsubscribe: UnsubscribeService,
        private readonly _query: LeadsListQuery,
        private readonly _modal3Service: Modal3Service,
        private readonly _translate: TranslateService,
        private readonly _cdr: ChangeDetectorRef
    ) {
        super(service);
    }

    ngAfterViewInit(): void {
        this.initColumns(this._configTableColumn2Component.checkedColumn$);
        this._initItems();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    refreshed(): void {
        this.service.updateLoading();
    }

    clearSelected(): void {
        this.transactionReportListComponent.clearSelected();
    }

    exportData(format: SheetExtensionType): void {
        const { currentLang } = this._translate;
        const exportDataRequest$ = this.service.exportData(format, this.selectedItems, currentLang).pipe(
            tap(() => {
                this.clearSelected();
            })
        );

        this.exportDataToFile(exportDataRequest$);
    }

    deliverAgain(): void {
        const ref$ = this._modal3Service.confirm(this._translate.instant('leads_ui_page.leads.deliver_again.message'), {
            title: this._translate.instant('confirm_message.are_you_sure'),
            typeButton: 'main',
            actionLabel: this._translate.instant('interface.basic.continue')
        });

        ref$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.service.deliverAgain(this.selectedItems)),
                take(1)
            )
            .subscribe({
                next: () => {
                    const message = this._translate.instant('leads_ui_page.leads.deliver_again.response_message');
                    this.toastr.successes(message);
                    this.clearSelected();
                    this._reloadList();
                },
                error: (error) => {
                    this.toastr.displayValidationMessages(error?.info?.errors);
                }
            });
    }

    statusWasChanged(): void {
        this.clearSelected();
        this._reloadList();
    }

    editLead(id: string): void {
        // const modalInputs: ModalRightInputsModel = {
        //     title: this.translate.instant('reports_page.conversions.edit.title'),
        //     controlLabel: this.translate.instant('shared.dictionary.save')
        // };

        this._modal3Service
            .editForm(ConversionEditModalComponent, {
                data: {
                    id
                }
            })
            .afterClosed$.toPromise()
            .then(() => {
                this._reloadList();
            });
    }

    selectItems(items: string[]): void {
        this.selectedItems = items;
    }

    private _reloadList(): void {
        this.updateSubject$.next(true);
        this.refreshed();
    }

    private _initItems(): void {
        combineLatest([this._query.prepareParams$, this.restart$.pipe(startWith(true)), this.updateSubject$])
            .pipe(
                debounceTime(300),
                map((data) => data[0]),
                filter((filters) => !!filters.payload.columns),
                switchMap((filters) =>
                    this.service.index(filters).pipe(
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
}
