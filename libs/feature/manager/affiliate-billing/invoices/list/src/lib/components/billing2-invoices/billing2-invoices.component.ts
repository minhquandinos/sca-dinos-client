import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { catchError, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { filter, map, pluck, share, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    BILLING_LAYOUT,
    Billing2LayoutComponent,
    ManagerBillingInvoiceConfirmChangeStatusService,
    ManagerBillingInvoiceUpsertModalService
} from '@scaleo/feature/manager/affiliate-billing/common';
import {
    AffiliateInvoiceMultiChangeStatusService,
    Billing2InvoicesQuery,
    Billing2InvoicesService,
    Billing2InvoicesToastrService,
    MANAGER_BILLING_INVOICES_DATA_ACCESS_PROVIDER,
    MultiDeleteAffiliateInvoiceService
} from '@scaleo/feature/manager/affiliate-billing/invoices/data-access';
import { setAffiliateInvoicesColumnsWidthUtil } from '@scaleo/invoice/common';
import { SheetExtensionType } from '@scaleo/platform/data';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ConfigTableColumn2Component, ReportExportComponent, ReportLastUpdatedComponent } from '@scaleo/shared/components';
import {
    SelectRowModel,
    ToastrBarEventEnum,
    ToastrBarService,
    UiPageWrapperHeaderColorDirective,
    UiTable2Component,
    UiTable2CustomColumnTranslate,
    UiTable2SortColumnModel
} from '@scaleo/ui-kit/elements';
import { ErrorUtil } from '@scaleo/utils';

@Component({
    selector: 'app-billing2-invoices',
    templateUrl: './billing2-invoices.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        UnsubscribeService,
        {
            provide: BILLING_LAYOUT,
            useExisting: Billing2LayoutComponent
        },
        ManagerBillingInvoiceUpsertModalService,
        MultiDeleteAffiliateInvoiceService,
        AffiliateInvoiceMultiChangeStatusService,
        ManagerBillingInvoiceConfirmChangeStatusService,
        Billing2InvoicesToastrService,
        MANAGER_BILLING_INVOICES_DATA_ACCESS_PROVIDER
    ]
})
export class Billing2InvoicesComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('layoutHeaderTpl', { static: true })
    private readonly layoutHeaderTpl: TemplateRef<HTMLElement>;

    @ViewChild('actionTpl', { static: true })
    private readonly actionTpl: TemplateRef<HTMLElement>;

    items$ = this.invoicesQuery.selectAll();

    pagination$ = this.invoicesQuery.selectDataValue$('pagination');

    columns$ = this.invoicesQuery.columns$.pipe(map((columns) => setAffiliateInvoicesColumnsWidthUtil(columns)));

    readonly loading$ = this.invoicesQuery.selectLoading();

    readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));

    private _totalAmountSubject$: Subject<void> = new Subject();

    readonly totalAmount$ = this._totalAmountSubject$.pipe(
        startWith(''),
        switchMap(() => this.invoicesService.getAmount().pipe(pluck('invoices_total_amount')))
    );

    sortDirection$ = this.invoicesQuery.selectParamsValue$('sortDirection');

    sortField$ = this.invoicesQuery.selectParamsValue$('sortField');

    showPagination$ = combineLatest([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    columnsOptions$ = this.invoicesService.getColumnsOptions();

    readonly requiredColumns: string[] = ['invoice_number'];

    readonly rangeDate$ = this.invoicesQuery.rangeDate$;

    @ViewChild(ConfigTableColumn2Component, { static: false })
    private set _configTableColumn2Component(value: ConfigTableColumn2Component) {
        if (value && !this.configTableColumn2Component) {
            this.configTableColumn2Component = value;
            this.initColumns();
        }
    }

    private configTableColumn2Component: ConfigTableColumn2Component;

    @ViewChild(UiPageWrapperHeaderColorDirective, { static: true })
    readonly headerColor: UiPageWrapperHeaderColorDirective;

    @ViewChild(ReportLastUpdatedComponent)
    private set _reportLastUpdatedRef(component: ReportLastUpdatedComponent) {
        if (component && !this.reportLastUpdatedRef) {
            this.reportLastUpdatedRef = component;
        }
    }

    reportLastUpdatedRef: ReportLastUpdatedComponent;

    @ViewChild(UiTable2Component)
    private readonly table2Component: UiTable2Component;

    @ViewChild(ReportExportComponent)
    private readonly reportExportComponent: ReportExportComponent;

    selectedRows: number[] = [];

    columnsTranslate: UiTable2CustomColumnTranslate = {
        date: 'invoice.generation_date'
    };

    readonly invoiceStatusNameEnum = InvoiceStatusNameEnum;

    readonly filters$ = this.invoicesQuery.selectParams$();

    constructor(
        @Inject(BILLING_LAYOUT) private readonly billing2Layout: Billing2LayoutComponent,
        private invoicesService: Billing2InvoicesService,
        private unsubscribe: UnsubscribeService,
        private invoicesQuery: Billing2InvoicesQuery,
        private translate: TranslateService,
        private upsertModalService: ManagerBillingInvoiceUpsertModalService,
        private ngxPermissionsService: NgxPermissionsService,
        private readonly deleteAffiliateInvoiceService: MultiDeleteAffiliateInvoiceService,
        private readonly multiChangeStatus: AffiliateInvoiceMultiChangeStatusService,
        private readonly invoicesToastr: Billing2InvoicesToastrService,
        private readonly toastr: ToastrBarService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.invoicesService.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        this.appendToLayout();
    }

    ngOnDestroy(): void {
        this.billing2Layout.createAction(undefined);
    }

    pageWasChanged(page: number): void {
        this.invoicesService.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.invoicesService.updateParamsValue({ perPage, page: 1 });
    }

    sortWasChanged(sort: UiTable2SortColumnModel | undefined): void {
        this.invoicesService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    columnWasChanged(columns: string[]): void {
        this.invoicesService.updateParamsValue({
            columns: columns.join(',')
        });
    }

    selectAll(selected: SelectRowModel<number>[]): void {
        this.selectedRows = selected.map((item) => item.value);
    }

    clearSelected(): void {
        this.table2Component.clearSelected();
        this.selectedRows = [];
    }

    initColumns(): void {
        this.configTableColumn2Component.checkedColumn$
            .pipe(
                filter((columns) => columns.length > 0),
                take(1)
            )
            .subscribe((columns) => {
                this.columnWasChanged(columns);
            });
    }

    exportData(format: SheetExtensionType): void {
        this.invoicesService.exportData(format, this.selectedRows).then(() => {
            this.clearSelected();
            this.reportExportComponent.complete();
        });
    }

    downloadedPdf(): void {
        this.clearSelected();
    }

    create() {
        this.upsertModalService
            .generate()
            .pipe(take(1))
            .subscribe(() => {
                this.invoicesService.reloadItems();
            });
    }

    edit(id: number) {
        this.upsertModalService
            .update(id)
            .pipe(take(1))
            .subscribe(() => {
                this.invoicesService.reloadItems();
                this._totalAmountSubject$.next();
            });
    }

    refreshed() {
        this.invoicesService.reloadItems();
        this.reportLastUpdatedRef?.updated();
    }

    dateWasChanged(event: CustomDateRangeModel) {
        this.invoicesService.updateParamsValue({
            rangeFrom: event.rangeFrom,
            rangeTo: event.rangeTo,
            page: 1
        });
    }

    private appendToLayout() {
        this.billing2Layout.createHeader(this.layoutHeaderTpl);

        this.ngxPermissionsService.hasPermission(this.permissions.canGenerateEditDeleteInvoices).then(() => {
            this.billing2Layout.createAction(this.actionTpl);
        });
    }

    deleteInvoices() {
        this.deleteAffiliateInvoiceService
            .multipleDelete(this.selectedRows)
            .pipe(
                catchError((error) => {
                    if (ErrorUtil.hasError(error, 'invoices')) {
                        this.invoicesToastr.multiDeleteException();
                    }
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe(() => {
                this.invoicesToastr.multiDeleteSuccess();
                this.invoicesService.reloadItems();
                this.clearSelected();
            });
    }

    changedStatus(event: InvoiceStatusNameEnum): void {
        this.multiChangeStatus
            .change(this.selectedRows, event, event === InvoiceStatusNameEnum.Paid)
            .pipe(
                take(1),
                catchError((error) => {
                    if (ErrorUtil.hasError(error, 'invoices')) {
                        this.invoicesToastr.multiChangeStatusException();
                    }
                    return throwError(error);
                })
            )
            .subscribe(() => {
                this.invoicesService.reloadItems();
                this.invoicesToastr.multiChangeStatusSuccess();
                this.clearSelected();
            });
    }

    uploadFile(file: File, id: number): void {
        this.invoicesService.uploadAttachment(id, { attachment_file: file }).then(
            () => {
                this.invoicesService.reloadItems();
                this.toastr.response(ToastrBarEventEnum.UploadFile);
            },
            () => {
                this.toastr.response(ToastrBarEventEnum.UploadFileException);
            }
        );
    }
}
