import { Inject } from '@angular/core';

import { DASHBOARD_WIDGET, DashboardWidgetModel, getWidgetById, WidgetTransformInterface } from '@scaleo/dashboard/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

import { AffiliateNetworkSummaryWidgetTransform } from './affiliate-network-summary-widget.transform';
import { AffiliatePerformanceWidgetTransform } from './affiliate-performance-widget.transform';

export class AffiliateWidgetTransform implements WidgetTransformInterface {
    constructor(
        private readonly config: DashboardWidgetModel[],
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    transform(): DashboardWidgetModel[] {
        return this.config.map((widget) => {
            if (widget.identifier === DASHBOARD_WIDGET.networkSummary) {
                return this.networkSummaryTransform;
            }

            if (widget.identifier === DASHBOARD_WIDGET.performance) {
                return this.performanceTransform;
            }

            return widget;
        });
    }

    private get networkSummaryTransform(): DashboardWidgetModel {
        const widget = getWidgetById(this.config, DASHBOARD_WIDGET.networkSummary);
        const transformWidget = new AffiliateNetworkSummaryWidgetTransform(widget, this.canSeePendingConversions);

        return transformWidget.transform();
    }

    private get performanceTransform(): DashboardWidgetModel {
        const widget = getWidgetById(this.config, DASHBOARD_WIDGET.performance);

        const transformWidget = new AffiliatePerformanceWidgetTransform(widget, this.canSeePendingConversions);

        return transformWidget.transform();
    }

    private get canSeePendingConversions(): boolean {
        return this.checkPermissionService.check(this.permissions.canSeePendingConv);
    }
}
