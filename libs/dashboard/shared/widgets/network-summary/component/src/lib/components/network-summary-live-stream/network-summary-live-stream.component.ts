import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Options } from 'highcharts';
import { interval } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { GridConfigRowEnum } from '@scaleo/dashboard/common';

import { NetworkSummaryLiveStreamInterface } from './network-summary-live-stream.interface';
import { NetworkSummaryLiveStreamService } from './network-summary-live-stream.service';

@Component({
    selector: 'app-network-summary-live-stream',
    templateUrl: './network-summary-live-stream.component.html',
    providers: [NetworkSummaryLiveStreamService, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkSummaryLiveStreamComponent implements OnInit, AfterViewInit {
    @HostBinding('class') hostClass = 'custom-dashboard-widget-live-stream d-block';

    @Input()
    configRows: GridConfigRowEnum;

    chartOptions: Options;

    total = 0;

    @ViewChild('dashboardChartComponent', { static: true }) dashboardChartComponent: ChartComparePeriodComponent;

    constructor(
        private networkSummaryLiveStreamService: NetworkSummaryLiveStreamService,
        private cdr: ChangeDetectorRef,
        private translate: TranslateService,
        private readonly unsubscribe: UnsubscribeService
    ) {}

    private static countTotal(data: number[]): number {
        return data.reduce((acc, value) => acc + value, 0);
    }

    ngOnInit(): void {
        this.initChartOptions();
        this.translateChartOnLangChange();
    }

    ngAfterViewInit(): void {
        this.initLiveStream();
    }

    private initChartOptions(): void {
        this.chartOptions = {
            chart: {
                type: 'column',
                height: this.configRows === GridConfigRowEnum.One ? 50 : 76,
                width: null,
                marginBottom: 3,
                spacingLeft: 0,
                spacingRight: 0,
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
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 0,
                minorGridLineWidth: 0
            },
            // plotOptions: {
            //     series: {
            //
            //     }
            // },
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
            series: [
                {
                    type: 'column',
                    name: 'Conversions',
                    color: '#FFFFFF',
                    pointWidth: 8,
                    borderWidth: null,
                    minPointLength: 1,
                    data: [],
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        };
    }

    private updateChartData({ ranges, series }: NetworkSummaryLiveStreamInterface): void {
        const { chart } = this.dashboardChartComponent;

        chart.ref.xAxis[0].update({
            categories: ranges
        });

        this.total = NetworkSummaryLiveStreamComponent.countTotal(series);

        chart.ref.series[0].update({
            type: 'column',
            data: series,
            name: this.translate.instant('table.column.total_conversions')
        });

        chart.ref.update({
            tooltip: {
                headerFormat: `
                            <span class="subtitle custom-chart-tooltip__subtitle">{point.key}</span>
                            <ul class="custom-chart-tooltip__items">
                            `,
                footerFormat: '</ul>',
                pointFormatter() {
                    return `<li class="custom-chart-tooltip__item">
                        <span class="custom-chart-tooltip__item-name-wrapper d-flex align-items-center">
                            <span
                                class="custom-chart-tooltip__color"
                                style="background-color: var(--main-bg-color);"
                            ></span>
                            <span class="custom-chart-tooltip__item-name">${this.series.name}</span>
                        </span>
                         <span class="d-block custom-chart-tooltip__item-value">${this.y}</span>
                        </li>`;
                }
            }
        });

        chart.ref.reflow();
    }

    private translateChartOnLangChange(): void {
        this.translate.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            const { chart } = this.dashboardChartComponent;
            chart.ref.series[0].update({
                type: 'column',
                name: this.translate.instant('table.column.total_conversions')
            });
        });
    }

    private initLiveStream(): void {
        interval(1000 * 60)
            .pipe(
                startWith(''),
                switchMap(() => this.networkSummaryLiveStreamService.data()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((value) => {
                this.updateChartData(value);
                this.cdr.markForCheck();
            });
    }
}
