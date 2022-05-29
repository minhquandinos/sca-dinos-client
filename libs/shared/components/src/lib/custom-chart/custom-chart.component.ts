import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';

@Component({
    selector: 'app-custom-chart',
    templateUrl: './custom-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomChartComponent implements OnInit {
    @Input() categories: any[] = [];

    @Input() series: any[] = [];

    @Input() set customOptions(options: Options) {
        if (options) {
            this.initChart(options);
            this.cdr.markForCheck();
        }
    }

    public chart: Chart;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        if (this.categories && this.series) {
            this.initChart();
        }
    }

    public initChart(options?: Options): void {
        let chartOptions: Options;
        if (!options) {
            chartOptions = {
                chart: {
                    type: 'spline',
                    height: 290
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
                    categories: this.categories,
                    labels: {
                        style: {
                            color: '#718290'
                        }
                    },
                    lineColor: '#f3f5f7'
                },
                yAxis: [
                    {
                        // left y axis
                        title: {
                            text: null
                        },
                        gridLineColor: '#f3f5f7',
                        labels: {
                            style: {
                                color: '#718290',
                                fontSize: '12px'
                            }
                        }
                    }
                    // { // right y axis
                    //     linkedTo: 0,
                    //     gridLineWidth: 0,
                    //     opposite: true,
                    //     title: {
                    //         text: null
                    //     },
                    //     gridLineColor: '#f3f5f7',
                    //     labels: {
                    //         align: 'right',
                    //         x: -3,
                    //         y: 16,
                    //         format: '{value:.,0f}',
                    //         style: {
                    //             color: '#718290',
                    //             fontSize: '12px'
                    //         }
                    //     },
                    //     showFirstLabel: false
                    // }
                ],
                series: this.series,
                colors: ['#ffa431', '#7ac205', '#5c76fe'],
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        marker: {
                            symbol: 'circle',
                            lineWidth: 3,
                            radius: 5.5
                        }
                    }
                }
            };
        }

        this.chart = new Chart(options || chartOptions);
    }
}
