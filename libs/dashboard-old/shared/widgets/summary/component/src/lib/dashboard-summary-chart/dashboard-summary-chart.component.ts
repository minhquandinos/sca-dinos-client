import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Options, SeriesOptionsType } from 'highcharts';
import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DashboardSummaryService } from '@scaleo/dashboard-old/shared/widgets/summary/data-access';
import { FormatByKeyPipe } from '@scaleo/platform/format/pipe';
import { GetFilterInterface, Post2FiltersInterface } from '@scaleo/shared/services/filters';

import { CustomChartComponent } from '../../../../../../../../shared/components/src/lib/custom-chart/custom-chart.component';
import { ChartDataTransform } from './chart-data-transform.class';

@Component({
    selector: 'app-dashboard-summary-chart',
    templateUrl: './dashboard-summary-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatByKeyPipe]
})
export class DashboardSummaryChartComponent implements OnInit, OnDestroy {
    @Input() showLegend: boolean;

    customOptions: Options;

    ranges: string[];

    series: any[];

    totals: any;

    isLoad = false;

    defaultLang: string;

    chartDataTransform: ChartDataTransform;

    @ViewChild(CustomChartComponent) private customChartRef: CustomChartComponent;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private dashboardSummaryService: DashboardSummaryService,
        private translate: TranslateService,
        @Inject(DOCUMENT) private document: Document,
        private cdr: ChangeDetectorRef,
        private formatByKeyPipe: FormatByKeyPipe
    ) {
        this.chartDataTransform = new ChartDataTransform();
    }

    ngOnInit(): void {
        this.initStatistics();

        this.translate.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe((lang) => {
            if (!!this.defaultLang && this.defaultLang !== lang.lang) {
                this.translateCategories();
                this.translateSeriesName();
                this.customChartRef.chart.ref.redraw();
            }
            this.defaultLang = lang.lang;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    hideSeries(index: number): void {
        if (this.customChartRef.chart.ref.series[index].visible) {
            this.customChartRef.chart.ref.series[index].hide();
        } else {
            this.customChartRef.chart.ref.series[index].show();
        }
        (this.customOptions.series[index] as any).visible = !(this.customOptions.series[index] as any).visible;
    }

    private initStatistics(): void {
        this.dashboardSummaryService
            .getConfig()
            .pipe(
                tap(() => {
                    this.isLoad = false;
                }),
                switchMap(([date, breakdown, columns]) => {
                    if (date && breakdown && columns) {
                        const params: GetFilterInterface = {
                            page: 1,
                            perPage: 10,
                            sortField: 'added_date',
                            sortDirection: 'desc'
                        };

                        const payload: Post2FiltersInterface = {
                            ...date,
                            breakdown,
                            breakdowns: breakdown,
                            columns
                        };

                        if (this.dashboardSummaryService.chartFilters.value) {
                            payload.filters = this.dashboardSummaryService.chartFilters.value;
                        }

                        return this.dashboardSummaryService.getStatistics({ payload, params });
                    }
                    return of(null);
                }),
                map((response: any) => {
                    if (response) {
                        const { series, totals } = response;
                        this.ranges = series?.ranges ? series.ranges.data : [];
                        this.series = series || [];
                        this.totals = totals && Object.keys(totals)?.length > 0 ? totals : false;
                    } else {
                        this.ranges = [];
                        this.series = [];
                        this.totals = false;
                    }
                    return response;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                // if (response) {}
                this.initChartOptions();
                this.isLoad = true;
                this.cdr.markForCheck();
            });
    }

    private initChartOptions(): void {
        const dates = this.ranges;
        this.customOptions = {
            chart: {
                type: 'line', // spline
                height: 325
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
                categories: this.convertResponseToCategories(),
                labels: {
                    style: {
                        color: '#b9c6d2',
                        fontSize: '12px'
                    },
                    y: 24,
                    // eslint-disable-next-line
                    formatter() {
                        const originalDate = this.value.toString();
                        switch ((this.chart.series[0]['userOptions'] as any).breakdown) {
                            case 'hour':
                                return originalDate.split(' ').pop();
                            case 'day':
                                // eslint-disable-next-line no-useless-escape
                                return (/\,(.*)(\.| )/.exec(originalDate) || dates[this.pos])[1].trim();
                            case 'month':
                                return originalDate;
                            case 'year':
                                return originalDate.split(' ').pop();
                            default:
                                return null;
                        }
                    }
                },
                lineColor: '#f3f5f7'
            },
            yAxis: [
                {
                    title: {
                        text: null
                    },
                    gridLineColor: '#f9f9f9',
                    gridLineWidth: 1,
                    labels: {
                        style: {
                            color: '#b9c6d2',
                            fontSize: '12px'
                        },
                        y: 4
                    }
                }
            ],
            tooltip: {
                // positioner: (labelWidth, labelHeight, point: Point) => {
                //     const chartWidth = this.document.querySelector('.chart-compare-period').clientWidth;
                //     const positionX = point.x + 100 >= chartWidth - labelWidth ? point.x - 170 : point.x + 60;
                //     if (point.y < 55) {
                //         return {
                //             x: positionX,
                //             y: 10,
                //         };
                //     }
                //     return {
                //         x: positionX,
                //         y: 10,
                //     };
                // },
                // formatter: function () {
                //     return 'The value for <b>' + this.x +
                //         '</b> is <b>' + this.y + '</b>';
                // },
                shared: true,
                useHTML: true,
                headerFormat: `
                            <span class="subtitle highcharts-label__subtitle">{point.key}</span>
                            <ul class="highcharts-label__items">
                            `,
                // eslint-disable-next-line
                pointFormatter() {
                    const opt = this.series['userOptions'] as any;
                    const pointTransform = (opt as any).pointTransformFunc(this.y, opt.key);
                    return `<li class="highcharts-label__item">
                        <span class="highcharts-label__item-name-wrapper d-flex align-items-center">
                            <span class="highcharts-label__color" style="background-color: ${opt.color}"></span>
                            <span class="highcharts-label__item-name">${this.series.name}</span>
                        </span>
                         <span class="d-block highcharts-label__item-value">${pointTransform}</span>
                        </li>`;
                },
                footerFormat: '</ul>',
                valueDecimals: 2,
                className: 'custom-test-tooltips',
                backgroundColor: '#fff',
                borderWidth: 0,
                borderRadius: 4,
                shadow: false,
                padding: 0,
                outside: false
            },
            series: this.convertResponseToSeries(),
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    lineWidth: 2,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        lineWidth: 2,
                        height: 7,
                        // radius: 5.5,
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
                // spline: {
                //     lineWidth: 3,
                //     states: {
                //         hover: {
                //             lineWidth: 3,
                //             enabled: true
                //         }
                //     },
                //     marker: {
                //         enabled: true,
                //     }
                // }
            },
            time: {
                // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset()
            }
        };
    }

    private convertResponseToCategories(): string[] {
        return this.chartDataTransform.convertCategories(
            this.ranges,
            this.dashboardSummaryService.breakdown.value,
            this.translate.currentLang
        );
    }

    private convertResponseToSeries(): SeriesOptionsType[] {
        return Object.entries(this.series)
            .filter(([key]) => key !== 'ranges')
            .map(([name, data], index) => ({
                ...data,
                name: this.translate.instant(`dashboard_page.legend.${name}`),
                key: name,
                visible: this.showLegend ? index < 2 : null,
                breakdown: this.dashboardSummaryService.breakdown.value,
                pointTransformFunc: (value: any, key: any) => this.formatByKeyPipe.transform(value, key, { digitsAfterPoint: 2 }),
                totals: this.totals && this.totals[name] ? this.totals[name] : 0,
                color: this.chartDataTransform.seriesColorMap(name)
            }));
    }

    private translateSeriesName(): void {
        this.customChartRef.chart.ref.series.forEach((el) => {
            el.name = this.translate.instant(`dashboard_page.legend.${(el as any)?.['userOptions']['key']}`);
        });
    }

    private translateCategories(): void {
        (this.customChartRef.chart.ref.xAxis?.[0] as any)['isDirty'] = true;
        (this.customChartRef.chart.ref.xAxis[0] as any).categories = this.convertResponseToCategories();
    }
}
