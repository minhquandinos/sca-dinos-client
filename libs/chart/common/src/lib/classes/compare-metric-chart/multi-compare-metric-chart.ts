import { TranslateService } from '@ngx-translate/core';
import { XAxisOptions } from 'highcharts';
import * as moment from 'moment';

import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { METRIC_COLORS_MAP } from '@scaleo/reports/common';

import { SelectedMetricModel } from '../../models/selected-metric.model';
import { BaseCompareMetricChart } from './base-compare-metric-chart';

export class MultiCompareMetricChart extends BaseCompareMetricChart {
    private firstMetricColor: string;

    private secondMetricColor: string;

    constructor(
        protected chartComponent: ChartComparePeriodComponent,
        private selectedMetric: SelectedMetricModel,
        protected dateRange: CustomDateRangeModel,
        protected data: ChartModel[],
        private translate: TranslateService
    ) {
        super(chartComponent, dateRange);
    }

    public render() {
        this.setMetricColor();

        this.multi();

        this.addCustomFn();

        this.addCustomTooltip();
    }

    private multi() {
        this.data.forEach((metric, index) => {
            if (metric) {
                if (index === 0) {
                    this.setCategories(metric);
                }
                this.addSeries(metric);
            }
        });
    }

    private setMetricColor() {
        const { first, second } = this.selectedMetric;
        this.firstMetricColor = METRIC_COLORS_MAP[first];
        this.secondMetricColor = METRIC_COLORS_MAP[second];
    }

    private addSeries(metric: ChartModel) {
        this.chart.addSeries(
            {
                type: 'line',
                data: metric.current.series,
                color: METRIC_COLORS_MAP[metric.key],
                name: this.translate.instant(`dashboard_grid.widget.performance.settings.${metric.key}`),
                custom: {
                    key: metric.key,
                    pointTransformFunc: (value: any, key: any) => this.chartComponent.pointTransformFunc(value, key),
                    dateTransformFunc: (date: string) => this.chartComponent.transformDate(moment(date), this.dateRange.diffDays)
                }
            },
            false,
            true
        );
    }

    private addCustomFn() {
        (this.chart.ref.userOptions.xAxis as XAxisOptions).labels.formatter.prototype['labelTransformFunc'] = (date: string) =>
            this.chartComponent.labelTransformFunc(date, this.dateRange.selectedRange);
    }

    private addCustomTooltip() {
        this.chart.ref.update({
            tooltip: {
                // eslint-disable-next-line object-shorthand
                formatter: function () {
                    const { dateTransformFunc, pointTransformFunc } = this.points[0].series.userOptions.custom;
                    let tooltip = '';

                    this.points.forEach((point) => {
                        const pointTransform = pointTransformFunc(point.y, point.series.userOptions.custom.key);
                        tooltip += `<li class="custom-chart-tooltip__item">
                                <span class="custom-chart-tooltip__item-name-wrapper d-flex align-items-center">
                                    <span class="custom-chart-tooltip__color" style="background-color: ${point.color}"></span>
                                    <span class="custom-chart-tooltip__item-name">${point.series.name}</span>
                                </span>
                                 <span class="d-block custom-chart-tooltip__item-value">${pointTransform}</span>
                        </li>`;
                    });

                    return `
                        <span class="subtitle custom-chart-tooltip__subtitle">${dateTransformFunc(this.x)}</span>
                            <ul class="custom-chart-tooltip__items">
                                ${tooltip}
                            </ul>
                    `;
                }
            }
        });
    }
}
