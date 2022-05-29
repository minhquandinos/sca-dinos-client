import { InjectionToken, Provider } from '@angular/core';

import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { MetricEnum } from '@scaleo/reports/common';

export const TREND_VOLUME_METRICS_TOKEN = new InjectionToken('TrendVolumeMetrics');

const metricsFactory = (checkPermissionService: CheckPermissionService) => {
    const defaultMetrics = [MetricEnum.GrossClicks, MetricEnum.TotalConversions];

    if (checkPermissionService.check(PLATFORM_PERMISSIONS.canAccessConversions)) {
        return defaultMetrics;
    }

    return [MetricEnum.GrossClicks];
};

export const TREND_VOLUME_METRIC_FACTORY: Provider = {
    provide: TREND_VOLUME_METRICS_TOKEN,
    useFactory: metricsFactory,
    deps: [CheckPermissionService]
};
