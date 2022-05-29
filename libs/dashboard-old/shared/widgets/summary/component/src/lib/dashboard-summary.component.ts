import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    HostBinding,
    Input,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { ContainerRef } from 'ngx-infinite-scroll';
import { Subject } from 'rxjs';
import { pairwise, startWith, takeUntil, tap } from 'rxjs/operators';

import { DashboardSummaryRangeDateInterface, DashboardSummaryService } from '@scaleo/dashboard-old/shared/widgets/summary/data-access';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { CustomDateRangeComponent } from '@scaleo/shared/components';

import { DashboardSummaryChartComponent } from './dashboard-summary-chart/dashboard-summary-chart.component';

@Component({
    selector: 'app-dashboard-summary',
    templateUrl: './dashboard-summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSummaryComponent implements AfterViewInit, OnDestroy {
    @Input() showLegend = true;

    @Input() haveBorderBottom = true;

    @Input() title = 'dashboard_page.network_summary';

    @HostBinding('class') hostClass = 'app-dashboard-summary';

    @ViewChild('chartContainerRef', { read: ViewContainerRef }) chartContainerRef: ContainerRef;

    @ViewChild('customDateRangeComponent', { static: true }) customDateRangeComponent: CustomDateRangeComponent;

    dateRange: DashboardSummaryRangeDateInterface = {
        rangeFrom: this.customDateRangeService.rangeFrom,
        rangeTo: this.customDateRangeService.rangeTo
    };

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private dashboardSummaryService: DashboardSummaryService,
        private cdr: ChangeDetectorRef,
        private customDateRangeService: CustomDateRangeService,
        private settingsQuery: PlatformSettingsQuery
    ) {}

    ngAfterViewInit(): void {
        this.updateBreakdownDetect();

        this.createChart();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    createChart(): void {
        this.chartContainerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DashboardSummaryChartComponent);
        const componentRef = this.chartContainerRef.createComponent(componentFactory);
        componentRef.instance.showLegend = this.showLegend;

        this.cdr.detectChanges();
    }

    updateDate(date?: CustomDateRangeModel): void {
        this.dateRange = {
            rangeFrom: date ? date.rangeFrom : this.customDateRangeService.rangeFrom,
            rangeTo: date ? date.rangeTo : this.customDateRangeService.rangeTo
        };
        this.dashboardSummaryService.rangeDate.next(this.dateRange);
    }

    private updateBreakdownDetect(): void {
        this.dashboardSummaryService.breakdown
            .pipe(
                startWith(''),
                pairwise(),
                tap(([oldBreakdown, newBreakdown]) => {
                    if (oldBreakdown === BreakdownEnum.Hour) {
                        this.customDateRangeComponent.switchSingle(false);
                    }

                    if (newBreakdown === BreakdownEnum.Hour) {
                        this.customDateRangeComponent.switchSingle(true);
                        this.customDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.Today);
                    }

                    if (
                        newBreakdown === BreakdownEnum.Day &&
                        this.settingsQuery.settings.platform_default_daterange === CustomDateRangeTitleEnum.Last14Days
                    ) {
                        this.customDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.Last14Days);
                    }

                    if (newBreakdown === BreakdownEnum.Month) {
                        this.customDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.ThisMonth);
                    }

                    if (newBreakdown === BreakdownEnum.Year) {
                        this.customDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.ThisYear);
                    }
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.updateDate({
                    rangeFrom: this.customDateRangeComponent.rangeFrom,
                    rangeTo: this.customDateRangeComponent.rangeTo
                });
            });
    }
}
