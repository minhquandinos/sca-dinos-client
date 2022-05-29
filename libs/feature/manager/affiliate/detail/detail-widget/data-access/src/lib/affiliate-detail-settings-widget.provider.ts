import { Provider } from '@angular/core';

import { AffiliateDetailSettingsWidgetApi } from './affiliate-detail-settings-widget.api';
import { AffiliateDetailSettingsWidgetService } from './affiliate-detail-settings-widget.service';

export const AFFILIATE_DETAIL_SETTINGS_WIDGET_PROVIDER: Provider[] = [
    AffiliateDetailSettingsWidgetApi,
    AffiliateDetailSettingsWidgetService
];
