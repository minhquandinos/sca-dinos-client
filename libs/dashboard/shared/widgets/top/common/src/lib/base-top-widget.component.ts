import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseDashboardWidgetComponent, WidgetServiceInterface } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { ReportsService } from '@scaleo/reports/state';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';

@Component({ template: '' })
export abstract class BaseTopWidgetComponent extends BaseDashboardWidgetComponent implements AfterViewInit {
    isLoad: boolean;

    maxRevenueValue: number;

    readonly selectedDates$ = this.dashboardToolbarService.selectedDates$;

    protected constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected widgetService: WidgetServiceInterface<any>,
        protected cdr: ChangeDetectorRef,
        protected profileQuery: ProfileQuery,
        protected dashboardToolbarService: DashboardToolbarService,
        protected reportService: ReportsService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        super(dashboardConfigService, dashboardWidgetService, widgetService);
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((action) => this.dashboardWidgetService.activeInactiveWidget(action, this.widget));

        this.cdr.detectChanges();
    }

    getMaxRevenueValue<T, K extends keyof T>(items: T[], key: K): number {
        const maxValue = [...items].sort((a, b) => (+a[key] > +b[key] ? -1 : 1));

        return maxValue.length > 0 ? +maxValue.shift()[key] : 0;
    }

    sorting(sort: UiTableSortInterface, filter: Filter2Interface): Filter2Interface {
        filter.params = {
            ...filter.params,
            sortField: sort.field,
            sortDirection: sort.direction
        };
        return filter;
    }

    toReport(link: 'affiliate' | 'offer') {
        this.reportService.updateDate({
            rangeFrom: this.dashboardToolbarService.selectedDates.rangeFrom,
            rangeTo: this.dashboardToolbarService.selectedDates.rangeTo
        });
        this.router.navigate([`../../reports/statistics/${link}`], { relativeTo: this.route });
    }
}
