import { Provider } from '@angular/core';

import { AffiliateUpsertApi } from './affiliate-upsert.api';
import { AffiliateUpsertService } from './affiliate-upsert.service';

export const AFFILIATE_UPSERT_PROVIDER: Provider[] = [AffiliateUpsertApi, AffiliateUpsertService];
