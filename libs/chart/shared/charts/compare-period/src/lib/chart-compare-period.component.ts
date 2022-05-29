import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { Options, XAxisOptions } from 'highcharts';
import { Moment } from 'moment';
import { EMPTY, filter, switchMap, takeUntil, throttleTime } from 'rxjs';

import { ResizeObserverService } from '@scaleo/core/resize-observer/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatByKeyPipe } from '@scaleo/platform/format/pipe';

@Component({
    selector: 'app-chart-compare-period',
    template: `
        <div class="custom-chart" #chartContainerRef [chart]="chart"></div>
    `,
    providers: [FormatByKeyPipe, ResizeObserverService, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComparePeriodComponent implements OnInit, AfterViewInit {
    @HostBinding('class') hostClass = 'd-block w-100 h-100';

    @Input() options: Options;

    @Input() height: number;

    @Input() width: number = null;

    @Input() marginBottom: number = undefined;

    @Input() marginRight: number = undefined;

    @Input() marginLeft: number = undefined;

    @Input() marginTop: number = undefined;

    @Input() categories: string[];

    @Input() series: number[];

    chart: Chart;

    @HostListener('window:resize', ['$event'])
    resize() {
        setTimeout(() => {
            this.chart?.ref?.reflow();
        }, 1000);
    }

    constructor(
        @Inject(DOCUMENT) private readonly _document: Document,
        private readonly _translate: TranslateService,
        private readonly _formatByKeyPipe: FormatByKeyPipe,
        private readonly _resizeObserverService: ResizeObserverService,
        private readonly _unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._initChart();
    }

    ngAfterViewInit() {
        this._resizeObserverService
            .observe(this.chart?.ref?.container)
            .pipe(
                switchMap(() => this.chart?.ref$ || EMPTY),
                filter((chart) => !!chart),
                throttleTime(300),
                takeUntil(this._unsubscribe)
            )
            .subscribe((chart) => {
                chart.reflow();
            });
    }

    private _initChart(): void {
        if (!this.options) {
            this.options = {
                chart: {
                    type: 'line',
                    height: this.height,
                    width: this.width,
                    marginBottom: this.marginBottom,
                    marginLeft: this.marginLeft,
                    marginRight: this.marginRight,
                    marginTop: this.marginTop,
                    spacingLeft: 0,
                    spacingRight: 0,
                    spacingBottom: 0
                    // events: {
                    //     // eslint-disable-next-line
                    //     render: function () {
                    //         console.log('reflowed');
                    //         this.reflow();
                    //     }
                    // }
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
                yAxis: {
                    opposite: true,
                    title: {
                        text: null
                    },
                    gridLineColor: '#f3f5f7',
                    labels: {
                        style: {
                            color: '#B9C6D2',
                            fontSize: '10px'
                        },
                        x: 5,
                        y: 3
                    }
                },
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

        this.chart = new Chart(this.options);
    }

    // private updateChartSize() {
    //     setTimeout(() => {
    //         this.chart.ref.reflow();
    //     }, 3800);
    // }

    clearChart() {
        const { ref } = this.chart;
        if (ref.series.length > 0) {
            ref.xAxis[0].removePlotLine('plotline-1');
            for (let i = ref.series.length - 1; i >= 0; i--) {
                ref.series[i].remove(false);
            }
        }
    }

    updateChart(options: Options, redraw = false) {
        const { ref } = this.chart;
        ref.update(options, redraw, true);
    }

    addCustomFunctionToObjectFormatterPrototype(name: string, object: 'tooltip' | 'labels', func: () => string) {
        switch (object) {
            case 'labels':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (this.chart.ref.userOptions.xAxis as XAxisOptions).labels.formatter.prototype[name] = func;
                break;
            case 'tooltip':
                this.chart.ref[object].options.pointFormatter.prototype[name] = func;
                break;
            default:
                break;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dateTransformFunc() {}

    labelTransformFunc(date: string, selectedRange: CustomDateRangeTitleEnum) {
        const momentDate = DateUtil.moment(date);
        momentDate.locale(this._translate.currentLang);
        switch (selectedRange) {
            case CustomDateRangeTitleEnum.Today:
            case CustomDateRangeTitleEnum.Yesterday:
                return momentDate.format('HH:00');
            case CustomDateRangeTitleEnum.Last7Days:
            case CustomDateRangeTitleEnum.Last14Days:
            case CustomDateRangeTitleEnum.Last30Days:
            case CustomDateRangeTitleEnum.Last90Days:
                return momentDate.format('D MMM');
            case CustomDateRangeTitleEnum.ThisMonth:
            case CustomDateRangeTitleEnum.LastMonth:
                return momentDate.format('D MMM');
            case CustomDateRangeTitleEnum.ThisYear:
                return momentDate.format('MMM');
            default:
                return date;
        }
    }

    transformDate(date: Moment, diffDays: number): string {
        date.locale(this._translate.currentLang);
        if (diffDays === 1) {
            return date.format('dddd, D MMM YYYY HH:mm');
        }

        if (diffDays > 90) {
            return date.format('MMM YYYY');
        }

        return date.format('dddd, D MMM YYYY');
    }

    transformDateForPreviousPeriod(date: Moment, dateRange: CustomDateRangeModel): string {
        let amount: number;
        let unit;
        let dateIsEndInMonth: boolean;
        let dateForTransform: Moment;
        switch (dateRange.selectedRange) {
            case CustomDateRangeTitleEnum.Today:
            case CustomDateRangeTitleEnum.Yesterday:
                amount = 1;
                unit = 'day';
                break;
            case CustomDateRangeTitleEnum.LastMonth:
            case CustomDateRangeTitleEnum.ThisMonth:
                amount = 1;
                unit = 'month';
                if (this._dateIsFirstOnNextMonth(date)) {
                    amount = 2;
                    dateIsEndInMonth = true;
                }
                break;
            case CustomDateRangeTitleEnum.ThisYear:
                amount = 1;
                unit = 'year';
                break;
            case CustomDateRangeTitleEnum.Last7Days:
            case CustomDateRangeTitleEnum.Last14Days:
            case CustomDateRangeTitleEnum.Last30Days:
            case CustomDateRangeTitleEnum.Last90Days:
            default:
                amount = dateRange.diffDays;
                unit = amount > 1 ? 'days' : 'day';
                break;
        }
        dateForTransform = date.subtract(amount as any, unit);
        if (dateIsEndInMonth) {
            dateForTransform = dateForTransform.endOf('month');
        }

        return this.transformDate(dateForTransform, dateRange.diffDays);
    }

    transformDateInTooltip(date: Moment, type: 'current' | 'previous', dateRange: CustomDateRangeModel) {
        if (type === 'previous') {
            return this.transformDateForPreviousPeriod(date, dateRange);
        }

        return this.transformDate(date, dateRange.diffDays);
    }

    pointTransformFunc(value: any, key: any) {
        return this._formatByKeyPipe.transform(value, key, { digitsAfterPoint: 2 });
    }

    private _dateIsFirstOnNextMonth(date: Moment): boolean {
        const firstDayNextMonth = DateUtil.moment().endOf('month').add(1);
        return firstDayNextMonth.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    }
}
