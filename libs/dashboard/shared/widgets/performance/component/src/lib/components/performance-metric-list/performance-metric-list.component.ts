import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, share, startWith, switchMap } from 'rxjs/operators';

import { PerformanceWidgetState } from '@scaleo/dashboard/shared/widgets/performance/data-access';
import { METRIC_COLORS_MAP, MetricEnum } from '@scaleo/reports/common';

import { PerformanceMetricEnum } from './enum/performance-metric.enum';
import { PerformanceMetricListModel } from './model/performance-metric.model';

@Component({
    selector: 'app-performance-metric-list',
    template: `
        <div class="d-flex align-items-center">
            <ng-select
                class="custom-dashboard-widget-performance-metric-list mr-2"
                [items]="firstMetricList$ | async | customTranslate: metricListTranslateSchema | async"
                bindLabel="title"
                bindValue="value"
                [searchable]="false"
                [clearable]="false"
                [hideSelected]="true"
                [(ngModel)]="firstMetric"
                (change)="selectedMetric()"
            >
                <ng-template ng-label-tmp let-item="item">
                    <span class="custom-dashboard-widget-performance-metric-list__item">
                        <i class="custom-dashboard-widget-performance-metric-list__color" [ngStyle]="{ background: item.color }"></i
                        >{{ item.title }}
                    </span>
                </ng-template>
                <ng-template ng-option-tmp let-item="item" let-index="index">
                    <span class="custom-dashboard-widget-performance-metric-list__item">
                        <i class="custom-dashboard-widget-performance-metric-list__color" [ngStyle]="{ background: item.color }"></i
                        >{{ item.title }}
                    </span>
                </ng-template>
            </ng-select>

            <ng-select
                class="custom-dashboard-widget-performance-metric-list"
                [items]="secondMetricList$ | async | customTranslate: metricListTranslateSchema | async"
                bindLabel="title"
                bindValue="value"
                [searchable]="false"
                [clearable]="false"
                [hideSelected]="true"
                [(ngModel)]="secondMetric"
                (change)="selectedMetric()"
            >
                <ng-template ng-label-tmp let-item="item">
                    <span class="custom-dashboard-widget-performance-metric-list__item">
                        <i
                            class="custom-dashboard-widget-performance-metric-list__color"
                            appPerformanceMetricColor
                            [firstMetric]="firstMetric"
                            [secondMetric]="secondMetric"
                            [color]="item.color"
                            [value]="item.value"
                        ></i
                        >{{ item.title }}
                    </span>
                </ng-template>
                <ng-template ng-option-tmp let-item="item" let-index="index">
                    <span class="custom-dashboard-widget-performance-metric-list__item">
                        <i
                            class="custom-dashboard-widget-performance-metric-list__color"
                            appPerformanceMetricColor
                            [firstMetric]="firstMetric"
                            [secondMetric]="secondMetric"
                            [color]="item.color"
                            [value]="item.value"
                        ></i
                        >{{ item.title }}
                    </span>
                </ng-template>
            </ng-select>
        </div>
    `
})
export class PerformanceMetricListComponent implements OnInit {
    readonly metricListTranslateSchema = 'dashboard_grid.widget.performance.settings';

    firstMetricList$: Observable<PerformanceMetricListModel[]>;

    secondMetricList$: Observable<PerformanceMetricListModel[]>;

    firstMetric: MetricEnum;

    secondMetric: MetricEnum;

    private listSubject$: Subject<void> = new Subject<void>();

    metricColors = METRIC_COLORS_MAP;

    @HostBinding('class') hostClass = 'performance-metric-list';

    constructor(private performanceWidgetState: PerformanceWidgetState) {}

    ngOnInit(): void {
        this.firstMetric = this.performanceWidgetState.firstMetric;
        this.secondMetric = this.performanceWidgetState.secondMetric;
        this.initMetric();
    }

    private initMetric() {
        this.firstMetricList$ = this.setMetricList$(PerformanceMetricEnum.First);

        this.secondMetricList$ = this.setMetricList$(PerformanceMetricEnum.Second).pipe(
            map((list) => [{ title: 'none', value: '', color: METRIC_COLORS_MAP['none'] }, ...list])
        );
    }

    selectedMetric() {
        this.listSubject$.next();
        this.performanceWidgetState.setMetric(this.firstMetric, this.secondMetric);
    }

    private setMetricList$(metricType: PerformanceMetricEnum): Observable<PerformanceMetricListModel[]> {
        return this.listSubject$.pipe(
            startWith(''),
            switchMap(() => this.performanceWidgetState.widgetSettings$),
            map((settings) => {
                const metric = metricType === PerformanceMetricEnum.First ? this.secondMetric : this.firstMetric;
                return settings.list
                    .filter((item) => item.key !== metric)
                    .map((item) => ({
                        title: item.key,
                        value: item.key,
                        color: METRIC_COLORS_MAP[item.key]
                    }));
            }),
            share()
        );
    }
}
