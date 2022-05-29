import { Provider } from '@angular/core';

import { SettingsAffiliateBillingApi } from './settings-affiliate-billing.api';
import { SettingsAffiliateBillingService } from './settings-affiliate-billing.service';

export const SETTINGS_AFFILIATE_BILLING_PROVIDER: Provider[] = [SettingsAffiliateBillingApi, SettingsAffiliateBillingService];
