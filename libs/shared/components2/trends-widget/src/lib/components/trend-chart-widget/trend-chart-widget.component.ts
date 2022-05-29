import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { NetworkSummeryWidgetApi } from '@scaleo/dashboard/shared/widgets/network-summary/data-access';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';
import { MetricEnum } from '@scaleo/reports/common';
import { ArrayUtil } from '@scaleo/utils';

import { TrendsChartWidgetFilterEnum } from './enum/trend-chart-widget.enum';
import { TrendChartWidgetService } from './services/trend-chart-widget.service';
import { TrendChartFiltersType } from './type/trend-chart-widget.type';

@Component({
    selector: 'scaleo-trend-chart-widget',
    template: `
        <div
            class="p-x-32 p-t-36 p-b-28"
            fxLayout="row"
            fxLayout.md="column"
            fxFlexFill
            fxLayoutGap="3rem"
            *ngIf="metrics$ | async; else notFoundTpl"
        >
            <div fxFlex="48" fxFlex.md="48" fxFlex.sm="100">
                <scaleo-chart-compare-widget
                    [widget]="first$ | async"
                    [date]="datePreset$ | async"
                    [dateRange]="date$ | async"
                ></scaleo-chart-compare-widget>
            </div>
            <div fxFlex="48" fxFlex.md="48" fxFlex.sm="100">
                <scaleo-chart-compare-widget
                    *ngIf="second$ | async"
                    [widget]="second$ | async"
                    [date]="datePreset$ | async"
                    [dateRange]="date$ | async"
                ></scaleo-chart-compare-widget>
            </div>
        </div>
        <ng-template #notFoundTpl>
            <app-not-found class="p-t-15 p-b-32 text-center"></app-not-found>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NetworkSummeryWidgetApi, TrendChartWidgetService, UnsubscribeService]
})
export class TrendChartWidgetComponent implements OnInit {
    @Input() metrics: MetricEnum[] = [];

    @Input() set itemId(id: number) {
        this._itemId$.next(id);
    }

    @Input() date$: Observable<CustomDateRangeModel>;

    @Input() filterBy: keyof Record<TrendsChartWidgetFilterEnum, string>;

    first$: BehaviorSubject<ChartModel> = new BehaviorSubject(null);

    second$: BehaviorSubject<ChartModel> = new BehaviorSubject(null);

    metrics$: Observable<boolean> = of(true);

    datePreset$: Observable<string>;

    private _itemId$: BehaviorSubject<number> = new BehaviorSubject(null);

    readonly itemId$ = this._itemId$.asObservable();

    constructor(private chartWidgetService: TrendChartWidgetService, private translate: TranslateService, private format: FormatService) {}

    ngOnInit(): void {
        this.datePreset$ = DateUtil.periodLabel(this.date$, this.translate, this.format);

        this.metrics$ = this.itemId$
            .pipe(
                switchMap((id) => {
                    const filters: TrendChartFiltersType = {
                        [this.filterBy]: id
                    };

                    if (!this.metrics.length) {
                        return of(false);
                    }

                    return this.chartWidgetService.index(this.metrics.join(','), filters).pipe(
                        startWith([]),
                        map((metrics: ChartModel[]) => {
                            if (metrics?.length > 0) {
                                const first = ArrayUtil.first(metrics);
                                let last;
                                if (metrics.length > 1) {
                                    last = ArrayUtil.last(metrics);
                                }
                                this.first$.next(first || undefined);
                                this.second$.next(last || undefined);
                                return this.showMetric(first) || this.showMetric(last);
                            }
                            return true;
                        })
                    );
                })
            )
            .pipe();
    }

    private showMetric(metric: ChartModel): boolean {
        return metric?.current?.total > 0 || metric?.previous?.total > 0;
    }
}
