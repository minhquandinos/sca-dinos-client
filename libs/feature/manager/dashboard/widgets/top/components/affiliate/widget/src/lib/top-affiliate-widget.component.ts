import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { BaseTopWidgetComponent } from '@scaleo/dashboard/shared/widgets/top/common';
import { ReportsService } from '@scaleo/reports/state';

import { TopAffiliateWidgetService } from './top-affiliate-widget.service';

@DynamicComponentLookup(DASHBOARD_WIDGET.topAffiliate)
@Component({
    selector: 'app-top-affiliate-widget',
    templateUrl: './top-affiliate-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TopAffiliateWidgetService]
})
export class TopAffiliateWidgetComponent extends BaseTopWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    dateRange$ = this.dashboardToolbarService.dateRange$;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected topAffiliateWidgetService: TopAffiliateWidgetService,
        protected profileQuery: ProfileQuery,
        protected cdr: ChangeDetectorRef,
        protected dashboardToolbarService: DashboardToolbarService,
        protected reportService: ReportsService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        super(
            dashboardConfigService,
            dashboardWidgetService,
            topAffiliateWidgetService,
            cdr,
            profileQuery,
            dashboardToolbarService,
            reportService,
            route,
            router
        );
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.setContainerWidgetFooterBorderTop();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
