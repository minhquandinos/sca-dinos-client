import { Provider } from '@angular/core';

import { OfferCustomParameterCreateApi } from './api/offer-custom-parameter-create.api';
import { OfferCustomParameterCreateService } from './service/offer-custom-parameter-create.service';

export const OFFER_CUSTOM_PARAMETER_UPSERT_PROVIDER: Provider[] = [OfferCustomParameterCreateApi, OfferCustomParameterCreateService];
