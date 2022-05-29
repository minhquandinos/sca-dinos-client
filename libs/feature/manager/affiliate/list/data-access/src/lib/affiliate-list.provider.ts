import { Provider } from '@angular/core';

import { AffiliateListApi } from './api/affiliate-list.api';
import { AffiliateListQuery } from './state/affiliate-list.query';
import { AffiliateListService } from './state/affiliate-list.service';
import { AffiliateListStore } from './state/affiliate-list.store';

export const AFFILIATE_LIST_PROVIDER: Provider[] = [AffiliateListApi, AffiliateListStore, AffiliateListQuery, AffiliateListService];
