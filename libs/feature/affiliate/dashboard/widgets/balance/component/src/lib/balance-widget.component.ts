import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import {
    BALANCE_WIDGET_PROVIDER,
    BalanceWidgetModel,
    BalanceWidgetService,
    RecentInvoiceModel
} from '@scaleo/feature-affiliate-dashboard-widgets-balance-data-access';

@DynamicComponentLookup(DASHBOARD_WIDGET.balance)
@Component({
    selector: 'app-balance-widget',
    templateUrl: './balance-widget.component.html',
    providers: [BALANCE_WIDGET_PROVIDER]
})
export class BalanceWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, OnDestroy, AfterViewInit {
    balance$: Observable<BalanceWidgetModel> = this.balancePaymentsService.data$.pipe(pluck('balance'));

    invoices$: Observable<RecentInvoiceModel[]> = this.balancePaymentsService.data$.pipe(pluck('recent-invoices'));

    loading$ = this.balancePaymentsService.loading$;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected balancePaymentsService: BalanceWidgetService
    ) {
        super(dashboardConfigService, dashboardWidgetService, balancePaymentsService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.balancePaymentsService.widgetData$.pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }
}
