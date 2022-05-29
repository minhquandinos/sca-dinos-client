import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map, Observable } from 'rxjs';

import {
    TREND_FINANCE_METRICS_TOKEN,
    TREND_FINANCES_METRIC_FACTORY,
    TREND_VOLUME_METRIC_FACTORY,
    TREND_VOLUME_METRICS_TOKEN
} from '@scaleo/feature/manager/common/trend';
import { DateUtil } from '@scaleo/platform/date/util';
import { FormatService } from '@scaleo/platform/format/service';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { MetricEnum } from '@scaleo/reports/common';
import { TrendsWidgetComponent } from '@scaleo/shared/components2/trends-widget';

@Component({
    selector: 'scaleo-manager-affiliate-trend-widget',
    templateUrl: './manager-affiliate-trend-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREND_FINANCES_METRIC_FACTORY, TREND_VOLUME_METRIC_FACTORY]
})
export class ManagerAffiliateTrendWidgetComponent implements OnInit {
    @Input() affiliateId: number;

    period$: Observable<string>;

    @ViewChild(TrendsWidgetComponent, { static: true })
    readonly trendsWidgetComponent: TrendsWidgetComponent;

    topOfferFooterTpl: TemplateRef<any>;

    trendsWidgetShowDatePresets = true;

    readonly showOffer$: Observable<boolean> = combineLatest([
        this.checkPermissionService.check$(this.permissions.canAccessOffers),
        this.checkPermissionService.check$([this.permissions.canSeeRevenue, this.permissions.canSeePayout])
    ]).pipe(map(([accessAffiliate, accessMetric]) => accessAffiliate && accessMetric));

    readonly showBalance$: Observable<boolean> = this.checkPermissionService.check$(this.permissions.canAccessAffiliateBilling);

    readonly showPendingBalance$: Observable<boolean> = this.checkPermissionService.check$(this.permissions.canSeePendingConv);

    constructor(
        private translate: TranslateService,
        private formatService: FormatService,
        private checkPermissionService: CheckPermissionService,
        @Inject(TREND_VOLUME_METRICS_TOKEN) public readonly volumeMetrics: MetricEnum[],
        @Inject(TREND_FINANCE_METRICS_TOKEN) public readonly financeMetrics: MetricEnum[],
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    ngOnInit(): void {
        this.period$ = DateUtil.periodLabel(this.trendsWidgetComponent.date$, this.translate, this.formatService);
    }

    activeTab(event: number) {
        this.trendsWidgetShowDatePresets = event !== 3;

        if (event !== 2) {
            this.topOfferFooterTpl = undefined;
        }

        if (event === 3) {
            this.trendsWidgetComponent.uiTabComponent.contentClassName = 'p-32';
        } else {
            this.trendsWidgetComponent.uiTabComponent.contentClassName = 'p-0';
        }
    }

    topOfferInitFooter(event: TemplateRef<any>) {
        Promise.resolve().then(() => {
            this.topOfferFooterTpl = event;
        });
    }
}
