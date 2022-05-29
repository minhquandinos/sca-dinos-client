import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import {
    TREND_FINANCE_METRICS_TOKEN,
    TREND_FINANCES_METRIC_FACTORY,
    TREND_VOLUME_METRIC_FACTORY,
    TREND_VOLUME_METRICS_TOKEN
} from '@scaleo/feature/manager/common/trend';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { MetricEnum } from '@scaleo/reports/common';
import { TrendsWidgetComponent } from '@scaleo/shared/components2/trends-widget';

enum OfferProfileTrendsTabsEnum {
    Volumes,
    Finances,
    TopAffiliates
}

@Component({
    selector: 'scaleo-manager-offer-detail-trends',
    templateUrl: './offer-detail-trends.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TREND_FINANCES_METRIC_FACTORY, TREND_VOLUME_METRIC_FACTORY]
})
export class OfferProfileTrendsComponent {
    @ViewChild(TrendsWidgetComponent, { static: true })
    readonly trendsWidgetComponent: TrendsWidgetComponent;

    footerTpl: TemplateRef<any>;

    readonly offerId$ = this.offerDetailQuery.id$;

    readonly showTopAffiliates$: Observable<boolean> = combineLatest([
        this.checkPermissionService.check$(this.permissions.canAccessAffiliates),
        this.checkPermissionService.check$([this.permissions.canSeeRevenue, this.permissions.canSeePayout])
    ]).pipe(map(([accessAffiliate, accessMetric]) => accessAffiliate && accessMetric));

    constructor(
        private readonly offerDetailQuery: OfferDetailQuery,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(TREND_VOLUME_METRICS_TOKEN) public readonly volumeMetrics: MetricEnum[],
        @Inject(TREND_FINANCE_METRICS_TOKEN) public readonly financeMetrics: MetricEnum[],
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    topAffiliateInitFooter(event: TemplateRef<any>): void {
        this.footerTpl = event;
    }

    activeTab(event: OfferProfileTrendsTabsEnum): void {
        if (event !== OfferProfileTrendsTabsEnum.TopAffiliates) {
            this.topAffiliateInitFooter(undefined);
        }
    }
}
