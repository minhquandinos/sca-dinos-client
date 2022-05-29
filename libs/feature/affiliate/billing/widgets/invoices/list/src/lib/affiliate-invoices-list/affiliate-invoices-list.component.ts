import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map, pluck, share, take, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AFFILIATE_ACCESS_INVOICES_WIDGET_QUERY_TOKEN,
    AFFILIATE_ACCESS_INVOICES_WIDGET_SERVICE_TOKEN,
    AffiliateAccessInvoicesWidgetQuery,
    AffiliateAccessInvoicesWidgetService
} from '@scaleo/feature/affiliate/billing/widgets/invoices/data-access';
import { InvoicesQueryInterface, InvoicesServiceInterface, setAffiliateInvoicesColumnsWidthUtil } from '@scaleo/invoice/common';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ConfigTableColumn2Component, ReportExportComponent } from '@scaleo/shared/components';
import {
    SelectRowModel,
    ToastrBarService,
    UiPageWrapperHeaderColorDirective,
    UiTable2ColumnsModel,
    UiTable2Component,
    UiTable2SortColumnModel
} from '@scaleo/ui-kit/elements';

type AffiliateInvoicesServiceType = InvoicesServiceInterface & AffiliateAccessInvoicesWidgetService;

type AffiliateInvoicesQueryType = InvoicesQueryInterface & AffiliateAccessInvoicesWidgetQuery;

@Component({
    selector: 'app-affiliate-invoices-list',
    templateUrl: './affiliate-invoices-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService]
})
export class AffiliateInvoicesListComponent implements OnInit {
    @Input() controlTemplate: TemplateRef<any>;

    readonly items$ = this.storeQuery.selectAll();

    readonly pagination$ = this.storeQuery.selectDataValue$('pagination');

    readonly columns$ = this.storeQuery.columns$.pipe(
        map((columns: UiTable2ColumnsModel[]) => setAffiliateInvoicesColumnsWidthUtil(columns))
    );

    readonly loading$ = this.storeQuery.selectLoading();

    readonly totalCount$ = this.pagination$.pipe(pluck('total_count'));

    readonly sortDirection$ = this.storeQuery.selectParamsValue$('sortDirection');

    readonly sortField$ = this.storeQuery.selectParamsValue$('sortField');

    readonly showPagination$ = combineLatest<[boolean, number]>([this.loading$, this.totalCount$]).pipe(
        map(([loading, total]) => !loading && total > 9),
        share()
    );

    columnsOptions$ = this.service.getColumnsOptions();

    readonly requiredColumns: string[] = ['invoice_number'];

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

    @ViewChild(UiTable2Component)
    private readonly table2Component: UiTable2Component;

    @ViewChild(ReportExportComponent)
    private readonly reportExportComponent: ReportExportComponent;

    selectedRows: number[] = [];

    constructor(
        @Inject(AFFILIATE_ACCESS_INVOICES_WIDGET_SERVICE_TOKEN)
        private readonly service: AffiliateInvoicesServiceType,
        @Inject(AFFILIATE_ACCESS_INVOICES_WIDGET_QUERY_TOKEN) private readonly storeQuery: AffiliateInvoicesQueryType,
        private readonly unsubscribe: UnsubscribeService,
        private readonly toastr: ToastrBarService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.service.index().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    pageWasChanged(page: number): void {
        this.service.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.service.updateParamsValue({ perPage });
    }

    sortWasChanged(sort: UiTable2SortColumnModel | undefined): void {
        this.service.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction,
            page: 1
        });
    }

    columnWasChanged(columns: string[]): void {
        this.service.updateParamsValue({
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
        this.service.exportData(format, this.selectedRows).then(() => {
            this.clearSelected();
            this.reportExportComponent.complete();
        });
    }

    downloadedPdf(): void {
        this.clearSelected();
    }

    reloadItems(): void {
        this.service.reloadItems();
    }

    uploadFile(file: File, id: number): void {
        // this.service.uploadAttachment(id, { attachment_file: file }).then(
        //     () => {
        //         this.invoicesService.reloadItems();
        //         this.toastr.response(ToastrBarEventEnum.UploadFile);
        //     },
        //     () => {
        //         this.toastr.response(ToastrBarEventEnum.UploadFileException);
        //     }
        // );

        this.service.reloadItems();
    }
}
