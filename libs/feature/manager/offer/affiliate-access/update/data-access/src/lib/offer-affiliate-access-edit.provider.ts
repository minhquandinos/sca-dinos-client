import { Provider } from '@angular/core';

import { OfferAffiliateAccessEditApi } from './api/offer-affiliate-access-edit.api';
import { OfferAffiliateAccessEditService } from './service/offer-affiliate-access-edit.service';

export const OFFER_AFFILIATE_ACCESS_EDIT_PROVIDER: Provider[] = [OfferAffiliateAccessEditApi, OfferAffiliateAccessEditService];
