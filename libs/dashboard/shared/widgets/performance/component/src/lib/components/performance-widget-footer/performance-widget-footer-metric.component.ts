import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

import { SelectedMetricModel } from '@scaleo/chart/common';
import { METRIC_COLORS_MAP } from '@scaleo/reports/common';

type MetricType = 'first' | 'second';

@Component({
    selector: 'app-performance-widget-footer-metric',
    template: `
        <i [ngStyle]="{ background: metricColor }" #metricColorRef></i>
        <ng-container *ngIf="showPeriod">{{ period }}</ng-container>
        <ng-container>
            <span class="custom-dashboard-compare-period__total">
                {{ totals | formatByKey: selectedMetric }}
            </span>
            <span class="custom-dashboard-compare-period__diff" appChangeColorOfNumber [value]="changes" *ngIf="changes"
                >{{ changes | format: 'percent':{ digitsAfterPoint: 0 } | positiveNegative }}
            </span>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceWidgetFooterMetricComponent {
    @Input() metricType: MetricType;

    @Input() totals: number;

    @Input() changes: number;

    @Input() set metric(metric: SelectedMetricModel) {
        if (metric) {
            const { first, second } = metric;

            this.setMetricColor(metric);

            this.showPeriod = first && !second;
        }
    }

    @Input() period: string;

    @Input() selectedMetric: string;

    metricColor: string;

    @ViewChild('metricColorRef', { static: true })
    metricColorRef: ElementRef;

    showPeriod: boolean;

    constructor(private renderer: Renderer2) {}

    private setMetricColor({ first, second }: SelectedMetricModel) {
        if (first && this.metricType === 'first') {
            this.metricColor = METRIC_COLORS_MAP[first];
        }

        if (first && !second && this.metricType === 'second') {
            this.metricColor = METRIC_COLORS_MAP[first];
            this.renderer.setStyle(this.metricColorRef.nativeElement, 'opacity', 0.3);
        }

        if (second && this.metricType === 'second') {
            this.metricColor = METRIC_COLORS_MAP[second];
            this.renderer.setStyle(this.metricColorRef.nativeElement, 'opacity', 1);
        }
    }
}
