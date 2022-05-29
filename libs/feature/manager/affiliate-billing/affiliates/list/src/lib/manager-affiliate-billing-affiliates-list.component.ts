import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, take, takeUntil, tap } from 'rxjs/operators';

import { AuthAsService } from '@scaleo/auth/as/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    BillingAffiliatesQuery,
    BillingAffiliatesService,
    MANAGER_AFFILIATE_BILLING_AFFILIATES_PROVIDER
} from '@scaleo/feature/manager/affiliate-billing/affiliates/data-access';
import { BILLING_LAYOUT, Billing2LayoutComponent } from '@scaleo/feature/manager/affiliate-billing/common';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ConfigTableColumn2Component, ReportExportComponent } from '@scaleo/shared/components';
import {
    RowSizeType,
    SelectRowModel,
    StatusesId,
    ToastrBarService,
    UiPageWrapperHeaderColorDirective,
    UiTable2Component,
    UiTable2CustomColumnTranslate,
    UiTableSortInterface
} from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-billing-affiliates-list',
    templateUrl: './billing-affiliates.component.html',
    providers: [
        MANAGER_AFFILIATE_BILLING_AFFILIATES_PROVIDER,
        UnsubscribeService,
        {
            provide: BILLING_LAYOUT,
            useExisting: Billing2LayoutComponent
        }
    ]
})
export class ManagerAffiliateBillingAffiliatesListComponent implements OnInit {
    readonly loading$ = this.query.select('loading');

    readonly columnsOptions$ = this.billingAffiliatesService.getColumnsOptions().pipe(shareReplay());

    readonly items$ = this.query.selectAll();

    readonly pagination$ = this.query.pagination$;

    readonly sortField$ = this.query.sortField$;

    readonly sortDirection$ = this.query.sortDirection$;

    readonly columns$ = this.query.columns$;

    readonly totalCount$ = this.query.totalCount$;

    readonly totalDue$ = this.billingAffiliatesService.getBalanceDue().pipe(pluck('total_balance_due'));

    readonly requiredColumns = this.getRequiredColumns;

    readonly statusesId = StatusesId;

    readonly filters$ = this.query.params$;

    @ViewChild(ConfigTableColumn2Component, { static: false })
    private set _configTableColumn2Component(value: ConfigTableColumn2Component) {
        if (value && !this.configTableColumn2Component) {
            this.configTableColumn2Component = value;
            this.initColumns();
        }
    }

    private configTableColumn2Component: ConfigTableColumn2Component;

    @ViewChild(UiTable2Component) private readonly table2Component: UiTable2Component;

    @ViewChild(ReportExportComponent) private readonly reportExportComponent: ReportExportComponent;

    @ViewChild('headerTpl', { static: true })
    private readonly headerTpl: TemplateRef<HTMLElement>;

    @ViewChild(UiPageWrapperHeaderColorDirective, { static: true })
    readonly headerColor: UiPageWrapperHeaderColorDirective;

    selectedBillingAffiliates: number[] = [];

    readonly showPagination$ = this.getShowPagination$();

    readonly rowSizeForTable: RowSizeType = {
        size: 48,
        units: 'px'
    };

    columnsTranslate: UiTable2CustomColumnTranslate = {
        payment_methods: 'table.column.payment_method'
    };

    constructor(
        private readonly billingAffiliatesService: BillingAffiliatesService,
        private readonly query: BillingAffiliatesQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly authAsService: AuthAsService,
        private readonly toastr: ToastrBarService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        @Inject(BILLING_LAYOUT) private readonly billing2LayoutComponent: Billing2LayoutComponent
    ) {}

    ngOnInit(): void {
        this.initItems();
        this.billing2LayoutComponent.createHeader(this.headerTpl);
    }

    private initItems(): void {
        this.billingAffiliatesService.getBillingAffiliateList$.pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    exportData(format: SheetExtensionType): void {
        this.billingAffiliatesService
            .exportData(format, this.selectedBillingAffiliates)
            .pipe(take(1))
            .subscribe(() => {
                this.clearSelected();
                this.reportExportComponent.complete();
            });
    }

    pageWasChanged(page: number): void {
        this.billingAffiliatesService.updateParamsValue({ page });
    }

    perPageWasChanged(perPage: number): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                page: 1
            },
            queryParamsHandling: 'merge'
        });
        this.billingAffiliatesService.updateParamsValue({ perPage, page: 1 });
    }

    sortingColumn(sort: UiTableSortInterface): void {
        this.billingAffiliatesService.updateParamsValue({
            sortField: sort.field,
            sortDirection: sort.direction
        });
    }

    columnWasChanged(columns: string[]): void {
        const joinedColumns = columns.join(',');
        this.billingAffiliatesService.updateParamsValue({ columns: joinedColumns });
    }

    private initColumns(): void {
        this.configTableColumn2Component.checkedColumn$
            .pipe(
                filter((columns) => columns.length > 0),
                tap((columns) => {
                    this.columnWasChanged(columns);
                }),
                take(1)
            )
            .subscribe();
    }

    selectAll(selected: SelectRowModel<number>[]): void {
        this.selectedBillingAffiliates = selected.map((item) => item.value);
    }

    clearSelected(): void {
        this.table2Component.clearSelected();
        this.selectedBillingAffiliates = [];
    }

    private get getRequiredColumns(): string[] {
        return ['affiliate', 'balance_due'];
    }

    private getShowPagination$(): Observable<boolean> {
        return combineLatest([this.totalCount$, this.loading$]).pipe(map(([totalCount, loading]) => totalCount > 9 && !loading));
    }

    loginAs(email: string): void {
        this.authAsService.login(email);
    }
}
