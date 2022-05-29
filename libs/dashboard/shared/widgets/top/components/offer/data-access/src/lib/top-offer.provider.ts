import { Provider } from '@angular/core';

import { TopOfferApi } from './api/top-offer.api';
import { TopOfferService } from './services/top-offer.service';

export const TOP_OFFER_PROVIDER: Provider[] = [TopOfferApi, TopOfferService];
