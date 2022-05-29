import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET, GridConfigRowEnum } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { NETWORK_SUMMARY_WIDGET_PROVIDER, NetworkSummaryWidgetService } from '@scaleo/dashboard/shared/widgets/network-summary/data-access';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportsService } from '@scaleo/reports/state';
import { NavigateRootService } from '@scaleo/shared/components';

@DynamicComponentLookup(DASHBOARD_WIDGET.networkSummary)
@Component({
    selector: 'app-network-summary-widget',
    templateUrl: './network-summary-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NETWORK_SUMMARY_WIDGET_PROVIDER]
})
export class NetworkSummaryWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('settingsTemplate') settingsTemplate: TemplateRef<any>;

    // @ViewChild(DropdownMenuComponent) set dropdownMenuComponent(component: DropdownMenuComponent) {
    //     if (component) {
    //         component.dropdownDirective?.open?.subscribe((status) => {
    //             if (status) {
    //                 this.dashboardConfigService.draggableResizableActivated(false);
    //             } else {
    //                 this.dashboardConfigService.draggableResizableActivated(true);
    //             }
    //         });
    //     }
    // }

    widgetData$: Observable<ChartModel[]> = this.networkSummaryWidgetService.widgetData$;

    widgets: ChartModel[] = [];

    selectedCurrentPeriod$ = this.dashboardToolbarService.currentDateRange$;

    selectedPreviousPeriod$ = this.dashboardToolbarService.previousDateRange$;

    date$ = this.networkSummaryWidgetService.toolbarDateRange$;

    gridConfigRowEnum = GridConfigRowEnum;

    selectedDates$: Observable<CustomDateRangeModel> = this.dashboardToolbarService.selectedDates$;

    constructor(
        protected override dashboardConfigService: DashboardConfigService,
        protected override dashboardWidgetService: DashboardWidgetService,
        private readonly cdr: ChangeDetectorRef,
        protected networkSummaryWidgetService: NetworkSummaryWidgetService,
        private readonly dashboardToolbarService: DashboardToolbarService,
        private readonly reportService: ReportsService,
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(dashboardConfigService, dashboardWidgetService, networkSummaryWidgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.networkSummaryWidgetService.initSettings(this.widget.settings);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((action) => this.dashboardWidgetService.activeInactiveWidget(action, this.widget));
        if (this.widget.active) {
            this.createWidgetSettings(this.settingsTemplate);
        }
        this.cdr.detectChanges();
    }

    toReport() {
        this.reportService.updateDate({
            rangeFrom: this.dashboardToolbarService.selectedDates.rangeFrom,
            rangeTo: this.dashboardToolbarService.selectedDates.rangeTo
        });
        this.navigateRootService.navigate('/reports/statistics/day');
    }

    trackByFn(index: number): number {
        return index;
    }
}
