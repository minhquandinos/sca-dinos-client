import { DashboardWidgetModel } from '@scaleo/dashboard/common';

import { LimitedAffiliateWidgetTransform } from './limited-affiliate-widget.transform';

export class LimitedAdvertiserWidgetTransform extends LimitedAffiliateWidgetTransform {
    constructor(protected config: DashboardWidgetModel[], protected showNetworkRevenue: boolean) {
        super(config, showNetworkRevenue);
    }
}
