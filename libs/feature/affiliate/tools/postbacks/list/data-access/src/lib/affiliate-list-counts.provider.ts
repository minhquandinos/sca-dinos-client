import { Provider } from '@angular/core';

import { AffiliateListCountsApi } from './affiliate-list-counts.api';
import { AffiliateListCountsService } from './affiliate-list-counts.service';

export const AFFILIATE_LIST_COUNTS_PROVIDER: Provider = [AffiliateListCountsApi, AffiliateListCountsService];
