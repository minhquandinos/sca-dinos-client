import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import {
    PERFORMANCE_WIDGET_PROVIDER,
    PerformanceWidgetFacade,
    PerformanceWidgetState
} from '@scaleo/dashboard/shared/widgets/performance/data-access';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';

@DynamicComponentLookup(DASHBOARD_WIDGET.performance)
@Component({
    selector: 'app-performance-widget',
    templateUrl: './performance-widget.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PERFORMANCE_WIDGET_PROVIDER]
})
export class PerformanceWidgetComponent extends BaseDashboardWidgetComponent implements AfterViewInit, OnInit, OnDestroy {
    @HostBinding('class') hostClass = '';

    selectedCurrentPeriod$ = this.dashboardToolbarService.currentDateRange$;

    selectedPreviousPeriod$ = this.dashboardToolbarService.previousDateRange$;

    dateRange$ = this.dashboardToolbarService.dateRange$;

    data$: Observable<ChartModel[]>;

    selectedMetric$ = this.performanceWidgetState._selectedMetric$;

    cumulative$ = this.performanceWidgetState._cumulative$;

    selectedDates$: Observable<CustomDateRangeModel> = this.dashboardToolbarService.selectedDates$;

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private cdr: ChangeDetectorRef,
        private performanceWidgetFacade: PerformanceWidgetFacade,
        private performanceWidgetState: PerformanceWidgetState,
        private dashboardToolbarService: DashboardToolbarService
    ) {
        super(dashboardConfigService, dashboardWidgetService, performanceWidgetFacade);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initWidgetSettings();

        this.performanceWidgetFacade.widgetData$.pipe(takeUntil(this.unsubscribe)).subscribe();
        this.data$ = this.performanceWidgetState._data$;
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((action) => this.dashboardWidgetService.activeInactiveWidget(action, this.widget));

        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    cumulativeToggle(selected: boolean): void {
        this.performanceWidgetFacade.setCumulative(selected);
    }

    private initWidgetSettings(): void {
        this.performanceWidgetFacade.initSettings(this.widget);
    }
}
