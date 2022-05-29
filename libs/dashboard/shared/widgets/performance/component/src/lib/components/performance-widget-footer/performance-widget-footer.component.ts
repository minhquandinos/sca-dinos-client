import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { SelectedMetricModel } from '@scaleo/chart/common';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { NavigateRootService } from '@scaleo/shared/components';

@Component({
    selector: 'app-performance-widget-footer',
    template: ` <div class="w-100 d-flex align-items-center">
        <div class="custom-dashboard-compare-period d-flex">
            <div class="custom-dashboard-compare-period__current">
                <app-performance-widget-footer-metric
                    metricType="first"
                    [metric]="selectedMetric"
                    [selectedMetric]="selectedMetric?.first"
                    [changes]="firstMetric?.current?.total_change"
                    [period]="selectedCurrentPeriod"
                    [totals]="firstMetric?.current?.total"
                ></app-performance-widget-footer-metric>
            </div>
            <div class="custom-dashboard-compare-period__previous">
                <app-performance-widget-footer-metric
                    metricType="second"
                    [metric]="selectedMetric"
                    [selectedMetric]="!!selectedMetric?.second ? selectedMetric?.second : selectedMetric?.first"
                    [changes]="secondMetricChanges"
                    [period]="selectedPreviousPeriod"
                    [totals]="secondMetricTotals"
                ></app-performance-widget-footer-metric>
            </div>
        </div>
        <div class="ml-auto">
            <ui-button-link
                iconPosition="right"
                icon="arrow-right-3"
                color="main"
                type="simple"
                [label]="'dashboard_grid.view_report' | translate"
                (click)="toReport()"
            ></ui-button-link>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceWidgetFooterComponent {
    @HostBinding('class') hostClass = 'd-block w-100';

    @Input() selectedMetric: SelectedMetricModel;

    @Input() selectedCurrentPeriod: string;

    @Input() selectedPreviousPeriod: string;

    @Input() selectedDates: CustomDateRangeModel;

    @Input() set data([firstMetric, secondMetric]: ChartModel[]) {
        if (firstMetric) {
            this.firstMetric = firstMetric;
        }

        if (!secondMetric) {
            this.secondMetricChanges = undefined;
            this.secondMetricTotals = this.firstMetric?.previous?.total;
        }

        if (secondMetric) {
            this.secondMetric = secondMetric;
            this.secondMetricChanges = this.secondMetric?.current?.total_change;
            this.secondMetricTotals = this.secondMetric?.current?.total;
        }
    }

    firstMetric: ChartModel;

    secondMetric: ChartModel;

    secondMetricChanges: number;

    secondMetricTotals: number;

    constructor(private navigateRootService: NavigateRootService) {}

    toReport() {
        this.navigateRootService.navigate('/reports/statistics/day', {
            rangeFrom: this.selectedDates.rangeFrom,
            rangeTo: this.selectedDates.rangeTo
        });
    }
}
