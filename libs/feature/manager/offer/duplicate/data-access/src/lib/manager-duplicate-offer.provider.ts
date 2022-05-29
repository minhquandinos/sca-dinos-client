import { Provider } from '@angular/core';

import { ManagerDuplicateOfferApi } from './manager-duplicate-offer.api';
import { ManagerDuplicateOfferService } from './manager-duplicate-offer.service';

export const MANAGER_DUPLICATE_OFFER_PROVIDER: Provider[] = [ManagerDuplicateOfferApi, ManagerDuplicateOfferService];
