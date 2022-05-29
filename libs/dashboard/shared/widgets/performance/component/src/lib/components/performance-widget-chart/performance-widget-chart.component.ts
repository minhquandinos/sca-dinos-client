import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MultiCompareMetricChart, SelectedMetricModel, SingleCompareMetricChart } from '@scaleo/chart/common';
import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { FormatByKeyPipe } from '@scaleo/platform/format/pipe';

@Component({
    selector: 'app-performance-widget-chart',
    templateUrl: './performance-widget-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatByKeyPipe, UnsubscribeService]
})
export class PerformanceWidgetChartComponent implements OnInit, AfterViewInit {
    @HostBinding('class') hostClass = 'd-block';

    @Input() set data(data: ChartModel[]) {
        if (data?.length > 0) {
            this.metricData$.next(data);
        }
    }

    @Input() selectedMetric: SelectedMetricModel;

    @Input() dateRange: CustomDateRangeModel;

    @ViewChild(ChartComparePeriodComponent)
    private set _dashboardChartComponent2(component: ChartComparePeriodComponent) {
        if (component && !this.dashboardChartComponent) {
            this.chart = component?.chart;
            this.dashboardChartComponent = component;
        }
    }

    dashboardChartComponent: ChartComparePeriodComponent;

    chart: Chart;

    chartOptions: Options;

    metricData$: BehaviorSubject<ChartModel[]> = new BehaviorSubject<ChartModel[]>([]);

    constructor(
        private readonly _formatByKeyPipe: FormatByKeyPipe,
        private readonly _translate: TranslateService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._initChartOptions();

        this._translateChartTooltip();
    }

    ngAfterViewInit(): void {
        this.metricData$.pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
            if (this.chart) {
                this.dashboardChartComponent.clearChart();
            }
            if (data) {
                this._renderMetric(data);
            }
        });
    }

    // TODO move to class
    private _initChartOptions() {
        this.chartOptions = {
            chart: {
                type: 'line',
                height: 300,
                marginRight: 40,
                marginLeft: 40,
                spacingLeft: 0,
                spacingRight: 0,
                spacingBottom: 0
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                labels: {
                    enabled: true,
                    style: {
                        color: '#687B88',
                        fontSize: '11px'
                    }
                },
                lineColor: '#f3f5f7'
            },
            yAxis: [
                {
                    title: {
                        text: null
                    },
                    // lineWidth: 1,
                    // lineColor: '#f3f5f7',
                    // gridLineColor: '#f3f5f7',
                    labels: {
                        align: 'left',
                        x: -30,
                        y: 3,
                        style: {
                            color: '#687B88',
                            fontSize: '11px'
                        }
                    },
                    showFirstLabel: false
                },
                {
                    linkedTo: 0,
                    // lineWidth: 1,
                    // lineColor: '#f3f5f7',
                    // gridLineColor: '#f3f5f7',
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: 26,
                        y: 3,
                        style: {
                            color: '#687B88',
                            fontSize: '11px'
                        }
                    },
                    showFirstLabel: false
                }
            ],
            tooltip: {
                hideDelay: 100,
                outside: true,
                shared: true,
                useHTML: true,
                valueDecimals: 2,
                className: 'custom-chart-tooltip',
                backgroundColor: '#fff',
                borderWidth: 0,
                borderRadius: 4,
                shadow: false,
                padding: 0
            },
            plotOptions: {
                series: {
                    pointPlacement: 'on',
                    cursor: 'pointer',
                    lineWidth: 2,
                    clip: false,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        lineWidth: 2,
                        height: 7,
                        states: {
                            hover: {
                                enabled: true,
                                radiusPlus: 0,
                                lineWidth: 0
                            }
                        }
                    },
                    states: {
                        hover: {
                            halo: null,
                            lineWidthPlus: 0
                        }
                    }
                }
            }
        };
    }

    private _singleMetric(data: ChartModel) {
        const single = new SingleCompareMetricChart(
            this.dashboardChartComponent,
            this.dateRange,
            this.selectedMetric,
            data,
            this._translate,
            null
        );

        single.render();
    }

    private _multiMetric(data: ChartModel[]) {
        const multi = new MultiCompareMetricChart(this.dashboardChartComponent, this.selectedMetric, this.dateRange, data, this._translate);

        multi.render();
    }

    private _translateChartTooltip(): void {
        this._translate.onLangChange.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            const { chart } = this.dashboardChartComponent;

            chart.ref.update(
                {
                    series: chart.ref.series.map((item) => ({
                        ...item.userOptions,
                        name: this._translate.instant(`dashboard_grid.widget.performance.settings.${this.selectedMetric.first}`)
                    }))
                },
                false
            );

            chart.ref.redraw(false);
        });
    }

    private _renderMetric(data: ChartModel[]) {
        if (data?.length === 1) {
            this._singleMetric(data[0]);
        }

        if (data?.length === 2) {
            this._multiMetric(data);
        }
    }
}
