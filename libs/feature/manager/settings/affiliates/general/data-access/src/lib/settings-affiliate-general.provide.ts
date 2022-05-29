import { Provider } from '@angular/core';

import { SettingsAffiliateGeneralApi } from './settings-affiliate-general.api';
import { SettingsAffiliateGeneralService } from './settings-affiliate-general.service';

export const SETTINGS_AFFILIATE_GENERAL_PROVIDE: Provider[] = [SettingsAffiliateGeneralApi, SettingsAffiliateGeneralService];
