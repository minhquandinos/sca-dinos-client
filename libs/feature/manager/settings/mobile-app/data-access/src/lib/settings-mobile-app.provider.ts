import { Provider } from '@angular/core';

import { MobileAppApi } from './api/mobile-app.api';
import { MobileAppService } from './service/mobile-app.service';

export const SETTINGS_MOBILE_APP_PROVIDER: Provider[] = [MobileAppApi, MobileAppService];
