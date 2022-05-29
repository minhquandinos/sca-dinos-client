import { InjectionToken, Provider } from '@angular/core';

import { CheckPermissionService, PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { MetricEnum } from '@scaleo/reports/common';

export const TREND_FINANCE_METRICS_TOKEN = new InjectionToken('TrendFinanceMetrics');

const metricsFactory = (checkPermissionService: CheckPermissionService) => {
    const defaultMetrics = [MetricEnum.TotalRevenue, MetricEnum.TotalPayout];

    if (
        checkPermissionService.check(PLATFORM_PERMISSIONS.canSeePayout) &&
        checkPermissionService.check(PLATFORM_PERMISSIONS.canSeeRevenue)
    ) {
        return defaultMetrics;
    } else if (checkPermissionService.check(PLATFORM_PERMISSIONS.canSeePayout)) {
        return [MetricEnum.TotalPayout];
    } else if (checkPermissionService.check(PLATFORM_PERMISSIONS.canSeeRevenue)) {
        return [MetricEnum.TotalRevenue];
    }

    return [];
};

export const TREND_FINANCES_METRIC_FACTORY: Provider = {
    provide: TREND_FINANCE_METRICS_TOKEN,
    useFactory: metricsFactory,
    deps: [CheckPermissionService]
};
