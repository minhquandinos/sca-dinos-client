import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

import { SingleCompareMetricChart } from '@scaleo/chart/common';
import { ChartComparePeriodComponent } from '@scaleo/chart/shared/charts/compare-period';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { FormatByKeyPipe } from '@scaleo/platform/format/pipe';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { MetricEnum } from '@scaleo/reports/common';

@Component({
    selector: 'scaleo-chart-compare-widget',
    templateUrl: './chart-compare-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormatByKeyPipe, UnsubscribeService]
})
export class ChartCompareWidgetComponent implements OnInit, AfterViewInit, OnChanges {
    @HostBinding('class') hostClass = 'custom-dashboard-widget-chart d-block h-100';

    @Input() widget: ChartModel;

    @Input() date: string;

    @Input() dateRange: CustomDateRangeModel;

    @ViewChild(ChartComparePeriodComponent, { static: true }) dashboardChartComponent: ChartComparePeriodComponent;

    constructor(
        private _platformSettingsQuery: PlatformSettingsQuery,
        private _formatByKeyPipe: FormatByKeyPipe,
        private _translate: TranslateService,
        private _unsubscribe: UnsubscribeService
    ) {}

    ngOnInit(): void {
        this._translateChartTooltip();
    }

    ngAfterViewInit(): void {
        this._initChart();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { widget } = changes;

        if (widget?.currentValue && !widget.isFirstChange()) {
            this._initChart();
            this.dashboardChartComponent.chart.ref.redraw(true);
        }
    }

    private _translateChartTooltip(): void {
        this._translate.onLangChange.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            const { chart } = this.dashboardChartComponent;
            chart.ref.update(
                {
                    series: chart.ref.series.map((item) => ({
                        ...item.userOptions,
                        name: this._translate.instant(`dashboard_grid.widget.performance.settings.${this.widget?.key}`)
                    }))
                },
                true
            );

            chart.ref.redraw();
        });
    }

    private _initChart() {
        const single = new SingleCompareMetricChart(
            this.dashboardChartComponent,
            this.dateRange,
            { first: this.widget?.key as MetricEnum, second: null },
            this.widget,
            this._translate,
            this._platformSettingsQuery.settings.main_color
        );
        single.render();
    }
}
