import { Provider } from '@angular/core';

import { AdvertiserUpsertApi } from './api/advertiser-upsert.api';
import { AdvertiserUpsertService } from './services/advertiser-upsert.service';

export const MANAGER_ADVERTISER_UPSERT_PROVIDER: Provider[] = [AdvertiserUpsertApi, AdvertiserUpsertService];
