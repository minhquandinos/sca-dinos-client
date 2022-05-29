import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { BaseTopWidgetComponent } from '@scaleo/dashboard/shared/widgets/top/common';
import { WidgetTopOfferRowsModel } from '@scaleo/dashboard/shared/widgets/top/components/offer/data-access';
import { ReportsService } from '@scaleo/reports/state';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';

import { TopOfferWidgetService } from './services/top-offer-widget.service';

@DynamicComponentLookup(DASHBOARD_WIDGET.topOffer)
@Component({
    selector: 'app-top-offer-widget',
    templateUrl: './top-offer-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopOfferWidgetComponent extends BaseTopWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    items$: Observable<WidgetTopOfferRowsModel[]>;

    selectedCurrentPeriod$: Observable<string> = this.topOfferWidgetService.currentDate$;

    dateRange$ = this.dashboardToolbarService.dateRange$;

    trigger$ = this.topOfferWidgetService.widgetData$;

    data = {
        dateRange$: this.dashboardToolbarService.dateRange$,
        trigger$: this.topOfferWidgetService.widgetData$,
        selectedCurrentPeriod$: this.topOfferWidgetService.currentDate$
    };

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        protected cdr: ChangeDetectorRef,
        public shared: SharedMethodsService,
        protected topOfferWidgetService: TopOfferWidgetService,
        protected profileQuery: ProfileQuery,
        protected dashboardToolbarService: DashboardToolbarService,
        protected reportService: ReportsService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        super(
            dashboardConfigService,
            dashboardWidgetService,
            topOfferWidgetService,
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
