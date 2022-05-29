import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Options } from 'highcharts';
import * as moment from 'moment';

import { ChartComparePeriodComponent } from '../../../../../../chart/shared/charts/compare-period/src/lib/chart-compare-period.component';
import { TableConversionLiveStatsModel } from '../table-conversion.model';

@Component({
    selector: 'app-table-conversion-highcharts',
    templateUrl: './table-conversion-highcharts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableConversionHighchartsComponent implements OnInit, AfterViewInit {
    @Input() data: TableConversionLiveStatsModel;

    @ViewChild('conversionsChartComponent', { static: true })
    conversionsChartComponent: ChartComparePeriodComponent;

    @HostBinding('class') hostClass = 'table-offers__conversions position-relative';

    public chartOptions: Options;

    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        this.initChartOptions();
    }

    ngAfterViewInit(): void {
        this.setCategories(this.data);
        if (this.data.current) {
            this.addCurrentSeries();
        }
        if (this.data.previous) {
            this.addPreviousSeries();
        }
        this.addCustomTooltip();
        this.addCustomFn();
    }

    private initChartOptions() {
        this.chartOptions = {
            chart: {
                type: 'column',
                height: 23,
                width: 34,
                marginTop: 0,
                marginBottom: 3,
                spacingLeft: 0,
                spacingRight: 0,
                spacingBottom: 0,
                backgroundColor: 'transparent'
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
                categories: [],
                lineColor: 'transparent',
                labels: {
                    // eslint-disable-next-line object-shorthand
                    formatter: function () {
                        const opt = this.chart.userOptions as any;
                        if (opt.xAxis.labels.formatter.prototype.labelTransformFunc) {
                            return opt.xAxis.labels.formatter.prototype.labelTransformFunc(this.value);
                        }
                        return this.value;
                    }
                }
            },
            yAxis: {
                min: 0,
                max: Math.max(...(this.data.current?.series || [0])),
                title: {
                    text: null
                },
                labels: {
                    enabled: false
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
            }
        };
    }

    private addCustomTooltip() {
        this.conversionsChartComponent.chart.ref.update({
            tooltip: {
                headerFormat: `
                            <span class="subtitle custom-chart-tooltip__subtitle">{series.name}</span>
                            <ul class="custom-chart-tooltip__items">
                            `,
                footerFormat: '</ul>',
                formatter: null,
                // eslint-disable-next-line object-shorthand
                pointFormatter: function () {
                    const opt = this.series['userOptions'] as any;
                    const opacity = opt.opacity ? opt.opacity : 0.3;
                    const dateType = opt.type === 'area' ? 'previous' : 'current';
                    const dateTransform = this.series.chart.tooltip.options.pointFormatter.prototype.dateTransformFunc(
                        this.category,
                        dateType
                    );
                    return `<li class="custom-chart-tooltip__item">
                        <span class="custom-chart-tooltip__item-name-wrapper d-flex align-items-center">
                            <span
                                class="custom-chart-tooltip__color"
                                style="background-color: var(--main-bg-color); opacity: ${opacity}"
                            ></span>
                            <span class="custom-chart-tooltip__item-name">${dateTransform}</span>
                        </span>
                         <span class="d-block custom-chart-tooltip__item-value">${this.y}</span>
                        </li>`;
                }
            }
        });
    }

    private addCurrentSeries() {
        this.conversionsChartComponent.chart.ref.addSeries(
            {
                type: 'column',
                data: this.data.current.series,
                name: this.translate.instant(`dashboard_grid.widget.performance.settings.${this.data.key}`),
                pointWidth: 4,
                borderWidth: 0,
                minPointLength: 2,
                dataLabels: {
                    enabled: false
                },
                opacity: 1
            },
            false,
            true
        );
    }

    private addPreviousSeries() {
        this.conversionsChartComponent.chart.ref.addSeries(
            {
                type: 'area',
                lineWidth: null,
                data: this.data.previous.series,
                opacity: 0,
                name: this.translate.instant(`dashboard_grid.widget.performance.settings.${this.data.key}`)
            },
            false,
            true
        );
    }

    private addCustomFn() {
        this.conversionsChartComponent.chart.ref.tooltip.options.pointFormatter.prototype['dateTransformFunc'] = (
            currentDate: string,
            type: 'current' | 'previous'
        ) =>
            this.conversionsChartComponent.transformDateInTooltip(moment(currentDate), type, {
                diffDays: this.data.previous?.ranges.length,
                previousRangeFrom: this.data.previous?.ranges[0],
                previousRangeTo: this.data.previous?.ranges.slice(-1)[0],
                rangeFrom: this.data.current?.ranges[0],
                rangeTo: this.data.current?.ranges.slice(-1)[0]
            });
    }

    private setCategories(data: TableConversionLiveStatsModel) {
        this.conversionsChartComponent.chart.ref.xAxis[0].setCategories(data.current?.ranges || data.previous?.ranges);
    }
}
