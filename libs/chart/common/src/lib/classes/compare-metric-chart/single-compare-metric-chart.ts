import { TranslateService } from '@ngx-translate/core';
import { XAxisOptions } from 'highcharts';
import * as moment from 'moment';

import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { METRIC_COLORS_MAP, MetricEnum } from '@scaleo/reports/common';

import { SelectedMetricModel } from '../../models/selected-metric.model';
import { BaseCompareMetricChart } from './base-compare-metric-chart';

export class SingleCompareMetricChart extends BaseCompareMetricChart {
    private _metricColor: string;

    constructor(
        protected chartComponent: ChartComparePeriodComponent,
        protected dateRange: CustomDateRangeModel,
        private _selectedMetric: SelectedMetricModel,
        private _data: ChartModel,
        private _translate: TranslateService,
        private _defaultMetricColor: string
    ) {
        super(chartComponent, dateRange);
        this.chart = chartComponent.chart;
    }

    public render() {
        const { first } = this._selectedMetric;
        if (first) {
            this.setCategories(this._data);

            this._setMetricColor(this._selectedMetric.first);

            this._addedPlotLine();

            this._addSeries();

            this._addCustomTooltip();

            this._addCustomFn();

            this.chart.ref.redraw(false);
        }
    }

    private _addedPlotLine() {
        const [firstXAxis] = this.chart?.ref?.xAxis || [];
        firstXAxis?.removePlotLine('plotline-1');
        if (
            this.dateRange.selectedRange === CustomDateRangeTitleEnum.Today ||
            this.dateRange.selectedRange === CustomDateRangeTitleEnum.ThisMonth ||
            this.dateRange.selectedRange === CustomDateRangeTitleEnum.ThisYear
        ) {
            firstXAxis.addPlotLine({
                color: '#B9C6D2',
                width: 1,
                value: this._data.current.series.length - 1,
                dashStyle: 'Dash',
                id: 'plotline-1'
            });
        }
    }

    private _setMetricColor(metric: MetricEnum) {
        this._metricColor = this._defaultMetricColor || METRIC_COLORS_MAP[metric];
    }

    private _addSeries() {
        this._addCurrentSeries();
        this._addPreviousSeries();
    }

    private _addCurrentSeries() {
        this.chart.ref.get('currentSeries')?.remove();
        this.chart.ref.addSeries(
            {
                id: 'currentSeries',
                type: 'line',
                data: this._seriesData,
                color: this._metricColor,
                name: this._translate.instant(`dashboard_grid.widget.performance.settings.${this._data.key}`)
            },
            false,
            true
        );
    }

    private get _seriesData(): any[] {
        if (!this._data.current.series) {
            return [];
        }
        return this._data.current.series.map((series, index) => {
            if (
                this._data.current.series.length - 1 === index &&
                (this.dateRange.selectedRange === CustomDateRangeTitleEnum.Today ||
                    this.dateRange.selectedRange === CustomDateRangeTitleEnum.ThisMonth ||
                    this.dateRange.selectedRange === CustomDateRangeTitleEnum.ThisYear)
            ) {
                return {
                    y: series,
                    marker: { enabled: true }
                };
            }
            return series;
        });
    }

    private _addPreviousSeries() {
        this.chart.ref.get('previousSeries')?.remove();
        this.chart.ref.addSeries(
            {
                id: 'previousSeries',
                type: 'area',
                lineWidth: null,
                // lineColor: this.firstMetricColor,
                // fillOpacity: 1,
                data: this._data.previous.series,
                color: this._metricColor,
                opacity: 0.3,
                name: this._translate.instant(`dashboard_grid.widget.performance.settings.${this._data.key}`)
            },
            false,
            true
        );
    }

    private _addCustomTooltip() {
        this.chart.ref.update({
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
                    const opacity = opt.opacity ? opt.opacity : 1;
                    const dateType = opt.type === 'area' ? 'previous' : 'current';
                    const pointTransform = this.series.chart.tooltip.options.pointFormatter.prototype.pointTransformFunc(this.y);
                    const dateTransform = this.series.chart.tooltip.options.pointFormatter.prototype.dateTransformFunc(
                        this.category,
                        dateType
                    );
                    return `<li class="custom-chart-tooltip__item">
                        <span class="custom-chart-tooltip__item-name-wrapper d-flex align-items-center">
                            <span
                                class="custom-chart-tooltip__color"
                                style="background-color: ${opt.color}; opacity: ${opacity}"
                            ></span>
                            <span class="custom-chart-tooltip__item-name">${dateTransform}</span>
                        </span>
                         <span class="d-block custom-chart-tooltip__item-value">${pointTransform}</span>
                        </li>`;
                }
            },
            xAxis: {
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
            }
        });
    }

    private _addCustomFn() {
        this.chart.ref.tooltip.options.pointFormatter.prototype['pointTransformFunc'] = (value: number, key = this._data.key) =>
            this.chartComponent.pointTransformFunc(value, key);

        this.chart.ref.tooltip.options.pointFormatter.prototype['dateTransformFunc'] = (
            currentDate: string,
            type: 'current' | 'previous'
        ) => this.chartComponent.transformDateInTooltip(moment(currentDate), type, this.dateRange);

        (this.chart.ref.userOptions.xAxis as XAxisOptions).labels.formatter.prototype['labelTransformFunc'] = (date: string) =>
            this.chartComponent.labelTransformFunc(date, this.dateRange.selectedRange);
    }
}
